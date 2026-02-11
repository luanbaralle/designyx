-- DESIGNYX — Supabase schema (Master Spec §11 + §10)
-- Run this in Supabase SQL Editor or via migrations

-- Users (extends Supabase Auth; sync via trigger or app)
-- Master Spec: id, credits_balance
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  credits int not null default 20,
  created_at timestamptz not null default now()
);

-- Credit transactions — Master Spec §10
create table if not exists public.credit_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  amount int not null,
  type text not null check (type in ('purchase', 'use', 'refund')),
  created_at timestamptz not null default now()
);

-- Subjects — Master Spec §11 (sujeito / Face Lock)
create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  image_url text not null,
  created_at timestamptz not null default now()
);

-- Style refs — Master Spec §11 (referências de estilo)
create table if not exists public.style_refs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  image_url text not null,
  created_at timestamptz not null default now()
);

-- Generations — Master Spec §11 (prompt, output_url, status)
create table if not exists public.generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  prompt text,
  style text,
  image_url text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- Templates (presets) — Master Spec §4, optional override of code presets
create table if not exists public.templates (
  id text primary key,
  name text,
  base_prompt text,
  negative_prompt text,
  default_style text,
  created_at timestamptz not null default now()
);

-- Uploads (legacy / compatibility: subject + style refs)
create table if not exists public.uploads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  file_url text not null,
  type text not null check (type in ('subject', 'style_ref')),
  created_at timestamptz not null default now()
);

-- Ensure user row exists when auth user is created
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, credits)
  values (new.id, new.email, 20)
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS
alter table public.users enable row level security;
alter table public.credit_transactions enable row level security;
alter table public.subjects enable row level security;
alter table public.style_refs enable row level security;
alter table public.generations enable row level security;
alter table public.templates enable row level security;
alter table public.uploads enable row level security;

-- Drop policies if they exist (idempotent re-run)
drop policy if exists "Users can read own row" on public.users;
drop policy if exists "Users can update own credits" on public.users;
create policy "Users can read own row"
  on public.users for select using (auth.uid() = id);
create policy "Users can update own credits"
  on public.users for update using (auth.uid() = id);

drop policy if exists "Users can read own credit_transactions" on public.credit_transactions;
drop policy if exists "Users can insert own credit_transactions" on public.credit_transactions;
create policy "Users can read own credit_transactions"
  on public.credit_transactions for select using (auth.uid() = user_id);
create policy "Users can insert own credit_transactions"
  on public.credit_transactions for insert with check (auth.uid() = user_id);

drop policy if exists "Users can read own subjects" on public.subjects;
drop policy if exists "Users can insert own subjects" on public.subjects;
create policy "Users can read own subjects"
  on public.subjects for select using (auth.uid() = user_id);
create policy "Users can insert own subjects"
  on public.subjects for insert with check (auth.uid() = user_id);

drop policy if exists "Users can read own style_refs" on public.style_refs;
drop policy if exists "Users can insert own style_refs" on public.style_refs;
create policy "Users can read own style_refs"
  on public.style_refs for select using (auth.uid() = user_id);
create policy "Users can insert own style_refs"
  on public.style_refs for insert with check (auth.uid() = user_id);

drop policy if exists "Users can read own generations" on public.generations;
drop policy if exists "Users can insert own generations" on public.generations;
create policy "Users can read own generations"
  on public.generations for select using (auth.uid() = user_id);
create policy "Users can insert own generations"
  on public.generations for insert with check (auth.uid() = user_id);

drop policy if exists "Anyone can read templates" on public.templates;
create policy "Anyone can read templates"
  on public.templates for select using (true);

drop policy if exists "Users can read own uploads" on public.uploads;
drop policy if exists "Users can insert own uploads" on public.uploads;
create policy "Users can read own uploads"
  on public.uploads for select using (auth.uid() = user_id);
create policy "Users can insert own uploads"
  on public.uploads for insert with check (auth.uid() = user_id);

-- Storage bucket (run after tables; may require Dashboard for first-time bucket)
insert into storage.buckets (id, name, public)
values ('designyx-uploads', 'designyx-uploads', true)
on conflict (id) do nothing;

-- Storage policies: drop if exists then create (idempotent)
drop policy if exists "Users can upload to own folder" on storage.objects;
drop policy if exists "Public read designyx-uploads" on storage.objects;
create policy "Users can upload to own folder"
  on storage.objects for insert
  with check (
    bucket_id = 'designyx-uploads'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
create policy "Public read designyx-uploads"
  on storage.objects for select
  using (bucket_id = 'designyx-uploads');

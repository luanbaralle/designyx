# DESIGNYX — AI Design Studio

Premium AI Design Studio: Face Lock + estilo + composição → imagem cinematográfica consistente.

## Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Zustand
- **Backend:** Next.js API Routes, Supabase (Auth, Database, Storage)
- **AI:** Pipeline multi-agente (Director → Critic → Renderer), provider plugável (Replicate)

## Estrutura

```
designyx/
├── app/                    # Frontend (Next.js UI) — não alterado pela organização do motor
│   ├── layout.tsx, page.tsx → redirect /studio
│   ├── studio/              # Main Studio UI
│   └── api/                 # generate, credits, uploads
├── core/                    # Motor (engine) — organizado conforme Master Spec
│   ├── templates/            # §4 Preset system (professional_headshot, gamer_thumbnail, …)
│   ├── subject-lock/         # §5 Character consistency (Subject Lock)
│   ├── prompt-library/      # §6 Blocos modulares + compiler
│   ├── style-matrix/        # §7 Sobriedade → Criatividade (0–100)
│   ├── critic/              # §8 Critic Loop (refinement 2–3 iterações)
│   └── engine/              # Orquestração: director, renderer, pipeline
├── lib/                     # supabase, credits, storage, utils
├── db/schema.sql            # Schema + RLS (users, credit_transactions, subjects, style_refs, generations, templates)
└── docs/
    ├── MASTER-SPEC.md       # Blueprint oficial v1 (spec definitiva)
    └── ENGINE.md            # Documentação do motor (estrutura e fluxo)
```

**Documentação de referência:** [docs/MASTER-SPEC.md](docs/MASTER-SPEC.md) (spec completa) e [docs/ENGINE.md](docs/ENGINE.md) (organização do motor).

## Setup

1. **Clone e instalar**
   ```bash
   cd designyx
   npm install
   ```

2. **Supabase**
   - Crie um projeto em [supabase.com](https://supabase.com).
   - Em SQL Editor, rode o conteúdo de `db/schema.sql`.
   - Copie `.env.example` para `.env.local` e preencha:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Ative Auth (Email ou outro) para ter usuários e créditos.

3. **Imagens (opcional)**
   - Para geração real, configure `REPLICATE_API_TOKEN` no `.env.local`.
   - Sem token, o endpoint retorna uma imagem placeholder.

4. **Rodar**
   ```bash
   npm run dev
   ```
   Acesse [http://localhost:3000](http://localhost:3000) → redireciona para `/studio`.

## Regras de créditos

- Novo usuário: **20 créditos** (definido no schema).
- Cada geração custa **1 crédito**.
- Generate desabilitado se créditos = 0.

## API

- `POST /api/uploads` — body: `FormData` com `file` e `type` (subject | style_ref). Retorna `{ url }`.
- `POST /api/generate` — body: `subjectUrl`, `style`, `composition`, `lighting`, `headline`, `cta`, etc. Retorna `{ imageUrl, status, log }`.
- `GET /api/credits` — retorna `{ credits }` do usuário autenticado.

## Deploy

- **Vercel:** conecte o repo e configure as env (Supabase + opcional Replicate).
- **Supabase:** já usado como infra (Auth, DB, Storage).

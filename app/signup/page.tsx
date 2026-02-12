import Link from "next/link";
import { signup } from "../login/actions";
import { Input } from "@/components/ui/input";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const error = typeof params?.error === "string" ? params.error : undefined;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-[380px] glass-card p-8 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Designyx</h1>
          <p className="text-sm text-muted-foreground">Criar conta</p>
        </div>

        {error && (
          <div
            className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3"
            role="alert"
          >
            {error === "missing"
              ? "Preencha email e senha."
              : error === "password"
                ? "Senha deve ter no mínimo 6 caracteres."
                : decodeURIComponent(error)}
          </div>
        )}

        <form action={signup} className="space-y-4">
          <div>
            <label htmlFor="email" className="studio-label block mb-1.5">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="seu@email.com"
              className="studio-input w-full h-11"
            />
          </div>
          <div>
            <label htmlFor="password" className="studio-label block mb-1.5">
              Senha (mín. 6 caracteres)
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              placeholder="••••••••"
              className="studio-input w-full h-11"
            />
          </div>
          <button
            type="submit"
            className="w-full h-11 rounded-xl font-medium bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
          >
            Criar conta
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Já tem conta?{" "}
          <Link href="/login" className="text-accent hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}

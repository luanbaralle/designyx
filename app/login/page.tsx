import Link from "next/link";
import { login } from "./actions";
import { Input } from "@/components/ui/input";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;
  const error = typeof params?.error === "string" ? params.error : undefined;
  const message = typeof params?.message === "string" ? params.message : undefined;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-[380px] glass-card p-8 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Designyx</h1>
          <p className="text-sm text-muted-foreground">Entre na sua conta</p>
        </div>

        {error && (
          <div
            className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3"
            role="alert"
          >
            {error === "missing"
              ? "Preencha email e senha."
              : decodeURIComponent(error)}
          </div>
        )}
        {message === "confirm" && (
          <div className="text-sm text-foreground bg-accent/10 border border-accent/20 rounded-xl px-4 py-3">
            Verifique seu email para confirmar o cadastro.
          </div>
        )}

        <form action={login} className="space-y-4">
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
              Senha
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="studio-input w-full h-11"
            />
          </div>
          <button
            type="submit"
            className="w-full h-11 rounded-xl font-medium bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Não tem conta?{" "}
          <Link href="/signup" className="text-accent hover:underline">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}

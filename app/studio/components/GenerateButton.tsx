"use client";

import { useStudioStore } from "../state/studio.store";
import { Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface GenerateButtonProps {
  onGenerate: () => void;
  className?: string;
}

export function GenerateButton({ onGenerate, className }: GenerateButtonProps) {
  const isGenerating = useStudioStore((s) => s.isGenerating);
  const credits = useStudioStore((s) => s.credits);
  const subjectUrl = useStudioStore((s) => s.subjectUrl);
  const disabled = isGenerating || credits === 0 || !subjectUrl;

  return (
    <button
      type="button"
      onClick={onGenerate}
      disabled={disabled}
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Gerando...</span>
        </>
      ) : (
        <>
          <Sparkles className="h-5 w-5" />
          <span>Gerar imagem</span>
        </>
      )}
    </button>
  );
}

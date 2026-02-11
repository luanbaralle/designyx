"use client";

import { useStudioStore } from "../state/studio.store";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function PreviewStage() {
  const subjectUrl = useStudioStore((s) => s.subjectUrl);
  const currentResultUrl = useStudioStore((s) => s.currentResultUrl);
  const isGenerating = useStudioStore((s) => s.isGenerating);

  const displayUrl = currentResultUrl || subjectUrl;

  return (
    <div
      className={cn(
        "relative flex min-h-[360px] w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-card",
        isGenerating && "animate-pulse"
      )}
    >
      {displayUrl ? (
        <div className="relative h-full w-full min-h-[360px]">
          <Image
            src={displayUrl}
            alt="Preview"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 60vw"
            unoptimized={displayUrl.startsWith("blob:") || displayUrl.includes("supabase")}
          />
          {isGenerating && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Gerando...</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <div className="h-24 w-24 rounded-full border-2 border-dashed border-border" />
          <p className="text-sm">Faça upload de uma foto (Face Lock)</p>
          <p className="text-xs">para começar</p>
        </div>
      )}
    </div>
  );
}

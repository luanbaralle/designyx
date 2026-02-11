"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Flame, ImageIcon, Download, Maximize2 } from "lucide-react";
import { useStudioStore } from "../state/studio.store";

interface RightPanelProps {
  onGenerate: () => void;
}

export function RightPanel({ onGenerate }: RightPanelProps) {
  const isGenerating = useStudioStore((s) => s.isGenerating);
  const subjectUrl = useStudioStore((s) => s.subjectUrl);
  const currentResultUrl = useStudioStore((s) => s.currentResultUrl);
  const history = useStudioStore((s) => s.history);
  const setCurrentResultUrl = useStudioStore((s) => s.setCurrentResultUrl);
  const credits = useStudioStore((s) => s.credits);

  const displayUrl = currentResultUrl || subjectUrl;
  const canGenerate = credits > 0 && !!subjectUrl && !isGenerating;

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Preview */}
      <div className="glass-card flex-1 min-h-[500px] flex flex-col">
        <div className="p-4 border-b border-border/20 flex items-center justify-between">
          <span className="studio-section-title">Preview</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="p-2 rounded-xl hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-2 rounded-xl hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="relative w-20 h-20">
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-accent/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-2 rounded-xl border-2 border-accent/60"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-4 rounded-lg bg-accent/10 flex items-center justify-center glow-accent">
                    <Flame className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">
                    Gerando imagem...
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Processando com IA cinematográfica
                  </p>
                </div>
              </motion.div>
            ) : displayUrl ? (
              <motion.div
                key="image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative w-full h-full min-h-[360px]"
              >
                <Image
                  src={displayUrl}
                  alt="Preview"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  unoptimized={
                    displayUrl.startsWith("blob:") ||
                    displayUrl.includes("supabase")
                  }
                />
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-3 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-secondary/50 border border-border/30 flex items-center justify-center">
                  <ImageIcon className="w-7 h-7 text-muted-foreground/40" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Sua imagem aparecerá aqui
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    Configure os parâmetros e clique em gerar
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* History */}
      <div className="glass-card p-4">
        <span className="studio-section-title text-xs">Histórico recente</span>
        <div className="grid grid-cols-6 gap-2 mt-3">
          {history.length === 0 ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-secondary/40 border border-border/20"
              />
            ))
          ) : (
            <>
              {history.slice(0, 6).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentResultUrl(item.imageUrl)}
                  className="aspect-square rounded-xl bg-secondary/40 border border-border/20 hover:border-accent/30 transition-all duration-200 cursor-pointer overflow-hidden relative"
                >
                  <Image
                    src={item.imageUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="120px"
                    unoptimized
                  />
                </button>
              ))}
              {Array.from({ length: Math.max(0, 6 - history.length) }).map(
                (_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="aspect-square rounded-xl bg-secondary/40 border border-border/20"
                  />
                )
              )}
            </>
          )}
        </div>
      </div>

      {/* Generate Button */}
      <div className="btn-generate w-full rounded-2xl">
        <div className="btn-generate__gradient" aria-hidden />
        <motion.button
          type="button"
          onClick={onGenerate}
          disabled={!canGenerate}
          whileHover={canGenerate ? { scale: 1.01 } : {}}
          whileTap={canGenerate ? { scale: 0.98 } : {}}
          className="relative z-10 w-full py-4 px-6 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Flame className="w-5 h-5" />
          <span className="text-base">Gerar imagem</span>
        </motion.button>
      </div>
    </div>
  );
}

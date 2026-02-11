"use client";

import { useStudioStore } from "../state/studio.store";
import { Coins } from "lucide-react";
import { cn } from "@/lib/utils";

export function CreditBadge({ className }: { className?: string }) {
  const credits = useStudioStore((s) => s.credits);
  const isZero = credits === 0;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium",
        isZero
          ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
          : "border-border bg-card text-foreground",
        className
      )}
    >
      <Coins className="h-4 w-4" />
      <span>{credits}</span>
      <span className="text-muted-foreground">créditos</span>
    </div>
  );
}

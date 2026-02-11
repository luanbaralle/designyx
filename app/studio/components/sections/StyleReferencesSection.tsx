"use client";

import { Upload, Plus } from "lucide-react";

export function StyleReferencesSection() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        A estética final seguirá essas referências
      </p>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <button
            key={i}
            type="button"
            className="aspect-square rounded-xl border-2 border-dashed border-border/30 flex items-center justify-center cursor-pointer hover:border-accent/30 hover:bg-secondary/20 transition-all"
          >
            {i === 0 ? (
              <Upload className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Plus className="w-4 h-4 text-muted-foreground/30" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

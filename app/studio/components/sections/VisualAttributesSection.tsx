"use client";

import { Slider } from "@/components/ui/slider";
import { Palette, Briefcase } from "lucide-react";
import { useStudioStore } from "../../state/studio.store";

export function VisualAttributesSection() {
  const value = useStudioStore((s) => s.attributesScore);
  const setValue = useStudioStore((s) => s.setAttributesScore);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5" />
          Criativo
        </span>
        <span className="flex items-center gap-1.5">
          Profissional
          <Briefcase className="w-3.5 h-3.5" />
        </span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => setValue(v ?? 50)}
        max={100}
        step={1}
        className="[&_[role=slider]]:bg-accent [&_[role=slider]]:border-0 [&_[role=slider]]:w-5 [&_[role=slider]]:h-5 [&_[role=slider]]:shadow-lg [&_[role=slider]]:shadow-accent/30"
      />
      <p className="text-center text-xs text-muted-foreground">
        Sobriedade estética: {value}%
      </p>
    </div>
  );
}

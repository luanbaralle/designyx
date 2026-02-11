"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";
import { useStudioStore } from "../../state/studio.store";

const styleLabels: Record<string, string> = {
  glassmorphism: "Glassmorphism",
  cinematic: "Cinematográfico",
  "ultra-realistic": "Ultra Realista",
  minimalist: "Minimalista",
  elegant: "Elegante",
  technological: "Tecnológico",
  institutional: "Institucional",
  cartoon: "Cartoon",
  gamer: "Gamer",
  "glow-cinematic": "Glow Cinemático",
  classic: "Clássico",
  formal: "Formal",
  sexy: "Sexy",
  "ui-interface": "UI Interface",
};

const STYLE_KEYS = [
  "glassmorphism",
  "cinematic",
  "ultra-realistic",
  "minimalist",
  "elegant",
  "technological",
  "institutional",
  "cartoon",
  "gamer",
  "glow-cinematic",
  "classic",
  "formal",
  "sexy",
  "ui-interface",
];

export function VisualStyleSection() {
  const style = useStudioStore((s) => s.style);
  const setStyle = useStudioStore((s) => s.setStyle);
  const [enabled, setEnabled] = useState(true);

  const toggle = (s: string) => {
    setStyle(s);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">
          Ativar estilo visual
        </span>
        <Switch checked={enabled} onCheckedChange={setEnabled} />
      </div>

      <AnimatePresence>
        {enabled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2">
              {STYLE_KEYS.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggle(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    style === key ? "selected-pill" : "unselected-pill"
                  }`}
                >
                  {styleLabels[key] ?? key}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

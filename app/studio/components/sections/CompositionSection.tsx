"use client";

import { Focus, UserSquare2, PersonStanding } from "lucide-react";
import { useStudioStore } from "../../state/studio.store";

const options = [
  { id: "close-up", label: "Close-up", sub: "Rosto", icon: Focus },
  { id: "medium-shot", label: "Plano médio", sub: "Busto", icon: UserSquare2 },
  { id: "american-shot", label: "Plano americano", sub: "Corpo", icon: PersonStanding },
];

export function CompositionSection() {
  const composition = useStudioStore((s) => s.composition);
  const setComposition = useStudioStore((s) => s.setComposition);

  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => setComposition(opt.id)}
          className={`w-full p-3.5 rounded-xl flex items-center gap-3 transition-all ${
            composition === opt.id ? "selected-pill" : "unselected-pill"
          }`}
        >
          <opt.icon
            className={`w-5 h-5 ${
              composition === opt.id ? "text-accent" : "text-muted-foreground"
            }`}
          />
          <div className="text-left">
            <p className="text-sm font-medium">{opt.label}</p>
            <p
              className={`text-xs ${
                composition === opt.id
                  ? "text-foreground/50"
                  : "text-muted-foreground"
              }`}
            >
              {opt.sub}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

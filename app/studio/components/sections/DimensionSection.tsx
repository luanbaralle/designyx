"use client";

import { Monitor, Smartphone, Youtube, Camera } from "lucide-react";
import { useStudioStore } from "../../state/studio.store";

const formats = [
  { id: "1:1", label: "Instagram Feed", sub: "1080×1080", icon: Monitor },
  { id: "9:16", label: "Story / Reels", sub: "1080×1920", icon: Smartphone },
  { id: "16:9", label: "YouTube Thumbnail", sub: "1280×720", icon: Youtube },
  { id: "4:5", label: "Portrait Pro", sub: "1080×1350", icon: Camera },
];

export function DimensionSection() {
  const dimension = useStudioStore((s) => s.dimension);
  const setDimension = useStudioStore((s) => s.setDimension);

  return (
    <div className="grid grid-cols-2 gap-2">
      {formats.map((f) => (
        <button
          key={f.id}
          type="button"
          onClick={() => setDimension(f.id)}
          className={`p-3 rounded-xl text-left transition-all ${
            dimension === f.id ? "selected-pill" : "unselected-pill"
          }`}
        >
          <f.icon
            className={`w-4 h-4 mb-2 ${
              dimension === f.id ? "text-accent" : "text-muted-foreground"
            }`}
          />
          <p className="text-xs font-semibold">{f.label}</p>
          <p
            className={`text-[10px] mt-0.5 ${
              dimension === f.id ? "text-foreground/60" : "text-muted-foreground"
            }`}
          >
            {f.sub}
          </p>
        </button>
      ))}
    </div>
  );
}

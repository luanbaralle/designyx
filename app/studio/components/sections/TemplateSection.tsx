"use client";

import { useStudioStore } from "../../state/studio.store";
import type { TemplateId } from "@/core/spec/types";
import { LAYOUT_TEMPLATES } from "@/core/templates/layouts";

const TEMPLATE_OPTIONS: { id: TemplateId; label: string }[] = [
  { id: "lux_ad_01", label: "Lux Ad" },
  { id: "text_overlay_center_01", label: "Texto central" },
  { id: "minimal_editorial_01", label: "Minimal Editorial" },
  { id: "hero_left_01", label: "Hero esquerda" },
  { id: "hero_right_01", label: "Hero direita" },
];

export function TemplateSection() {
  const templateId = useStudioStore((s) => s.templateId);
  const setTemplateId = useStudioStore((s) => s.setTemplateId);

  return (
    <div className="space-y-3">
      <label className="studio-label">Template de layout</label>
      <div className="grid grid-cols-2 gap-2">
        {TEMPLATE_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setTemplateId(opt.id)}
            className={`p-3 rounded-xl text-left text-sm font-medium transition-all ${
              templateId === opt.id ? "selected-pill" : "unselected-pill"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {LAYOUT_TEMPLATES[templateId]?.name ?? "Lux Ad"} — influencia o prompt de background
      </p>
    </div>
  );
}

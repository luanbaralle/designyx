"use client";

import { useStudioStore } from "../../state/studio.store";

function ColorPicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 rounded-xl border border-border/40 cursor-pointer appearance-none bg-transparent [&::-webkit-color-swatch-wrapper]:p-1 [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-0"
        />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground font-mono">{value}</p>
      </div>
    </div>
  );
}

export function ColorLightSection() {
  const ambient = useStudioStore((s) => s.ambientColor);
  const rim = useStudioStore((s) => s.rimColor);
  const fill = useStudioStore((s) => s.fillColor);
  const setAmbient = useStudioStore((s) => s.setAmbientColor);
  const setRim = useStudioStore((s) => s.setRimColor);
  const setFill = useStudioStore((s) => s.setFillColor);

  return (
    <div className="space-y-4">
      <ColorPicker
        label="Cor do ambiente"
        value={ambient}
        onChange={setAmbient}
      />
      <ColorPicker
        label="Luz de recorte (rim light)"
        value={rim}
        onChange={setRim}
      />
      <ColorPicker
        label="Luz complementar (fill light)"
        value={fill}
        onChange={setFill}
      />
    </div>
  );
}

"use client";

import { useStudioStore } from "../state/studio.store";
import { CreditBadge } from "./CreditBadge";
import { GenerateButton } from "./GenerateButton";
import { AgentLog } from "./AgentLog";
import { HistoryStrip } from "./HistoryStrip";
import { cn } from "@/lib/utils";

const STYLES = [
  "glassmorphism",
  "cinematic",
  "ultra-realistic",
  "minimalist",
  "elegant",
  "technological",
  "glow-cinematic",
];
const COMPOSITIONS = [
  { id: "close-up", label: "Close-up" },
  { id: "medium-shot", label: "Plano médio" },
  { id: "american-shot", label: "Plano americano" },
];
const LIGHTINGS = [
  { id: "cinematic", label: "Cinematográfico" },
  { id: "dramatic", label: "Dramático" },
  { id: "soft", label: "Suave" },
  { id: "neon", label: "Neon" },
];

interface SidebarProps {
  onUpload: (type: "subject" | "style_ref") => void;
  onGenerate: () => void;
  className?: string;
}

export function Sidebar({ onUpload, onGenerate, className }: SidebarProps) {
  const style = useStudioStore((s) => s.style);
  const composition = useStudioStore((s) => s.composition);
  const lighting = useStudioStore((s) => s.lighting);
  const headline = useStudioStore((s) => s.headline);
  const subheadline = useStudioStore((s) => s.subheadline);
  const cta = useStudioStore((s) => s.cta);
  const setStyle = useStudioStore((s) => s.setStyle);
  const setComposition = useStudioStore((s) => s.setComposition);
  const setLighting = useStudioStore((s) => s.setLighting);
  const setHeadline = useStudioStore((s) => s.setHeadline);
  const setSubheadline = useStudioStore((s) => s.setSubheadline);
  const setCta = useStudioStore((s) => s.setCta);

  return (
    <aside
      className={cn(
        "flex w-full flex-col gap-6 border-r border-border bg-card/30 p-6 md:w-[340px] md:shrink-0",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Studio</h2>
        <CreditBadge />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Subject (Face Lock)</label>
        <button
          type="button"
          onClick={() => onUpload("subject")}
          className="w-full rounded-xl border border-dashed border-border bg-background/50 px-4 py-3 text-sm text-muted-foreground transition hover:border-primary hover:text-foreground"
        >
          Upload foto
        </button>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Estilo</label>
        <div className="flex flex-wrap gap-2">
          {STYLES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStyle(s)}
              className={cn(
                "rounded-lg px-2.5 py-1 text-xs font-medium transition",
                style === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Composição</label>
        <div className="space-y-1">
          {COMPOSITIONS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setComposition(c.id)}
              className={cn(
                "w-full rounded-lg px-3 py-2 text-left text-sm transition",
                composition === c.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Iluminação</label>
        <div className="flex flex-wrap gap-2">
          {LIGHTINGS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setLighting(l.id)}
              className={cn(
                "rounded-lg px-2.5 py-1 text-xs font-medium transition",
                lighting === l.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Headline"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
        />
        <input
          type="text"
          placeholder="Subheadline"
          value={subheadline}
          onChange={(e) => setSubheadline(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
        />
        <input
          type="text"
          placeholder="CTA"
          value={cta}
          onChange={(e) => setCta(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground"
        />
      </div>

      <GenerateButton onGenerate={onGenerate} />

      <div className="space-y-2">
        <label className="block text-sm font-medium">Agent Log</label>
        <AgentLog />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Histórico</label>
        <HistoryStrip />
      </div>
    </aside>
  );
}

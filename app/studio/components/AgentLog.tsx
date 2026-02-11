"use client";

import { useStudioStore } from "../state/studio.store";
import { cn } from "@/lib/utils";

const roleColors: Record<string, string> = {
  Director: "text-blue-400",
  Critic: "text-amber-400",
  Renderer: "text-emerald-400",
  Done: "text-primary",
};

export function AgentLog() {
  const agentLog = useStudioStore((s) => s.agentLog);

  if (agentLog.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card/50 p-4">
        <p className="text-sm text-muted-foreground">
          O log dos agentes aparecerá aqui durante a geração.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card/50 p-4 font-mono text-sm">
      <div className="space-y-1.5">
        {agentLog.map((entry, i) => (
          <div key={`${entry.at}-${i}`} className="flex gap-2">
            <span
              className={cn(
                "shrink-0 font-semibold",
                roleColors[entry.role] ?? "text-muted-foreground"
              )}
            >
              [{entry.role}]:
            </span>
            <span className="text-foreground/90">{entry.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

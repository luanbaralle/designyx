"use client";

import { Switch } from "@/components/ui/switch";
import { useStudioStore } from "../../state/studio.store";

export function PostEffectsSection() {
  const blur = useStudioStore((s) => s.postfxBlur);
  const gradient = useStudioStore((s) => s.postfxGradient);
  const setBlur = useStudioStore((s) => s.setPostfxBlur);
  const setGradient = useStudioStore((s) => s.setPostfxGradient);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">
            Blur suave de fundo
          </p>
          <p className="text-xs text-muted-foreground">
            Desfoque sutil no background
          </p>
        </div>
        <Switch checked={blur} onCheckedChange={setBlur} />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">
            Degradê lateral premium
          </p>
          <p className="text-xs text-muted-foreground">
            Gradiente elegante nas bordas
          </p>
        </div>
        <Switch checked={gradient} onCheckedChange={setGradient} />
      </div>
    </div>
  );
}

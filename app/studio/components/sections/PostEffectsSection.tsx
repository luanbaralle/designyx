"use client";

import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export function PostEffectsSection() {
  const [blur, setBlur] = useState(false);
  const [gradient, setGradient] = useState(true);

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

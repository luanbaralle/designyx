"use client";

import { useEffect, useState, useRef } from "react";
import { compose, type ComposerLayout } from "@/lib/composer";
import { useStudioStore } from "../state/studio.store";
import { getLayoutTemplate } from "@/core/templates/layouts";

const DIMENSIONS: Record<string, [number, number]> = {
  "1:1": [1080, 1080],
  "9:16": [1080, 1920],
  "16:9": [1280, 720],
  "4:5": [1080, 1350],
};

export function ComposerCanvas() {
  const backgroundUrl = useStudioStore((s) => s.backgroundUrl);
  const currentResultUrl = useStudioStore((s) => s.currentResultUrl);
  const headline = useStudioStore((s) => s.headline);
  const subheadline = useStudioStore((s) => s.subheadline);
  const cta = useStudioStore((s) => s.cta);
  const textOverlayEnabled = useStudioStore((s) => s.textOverlayEnabled);
  const dimension = useStudioStore((s) => s.dimension);
  const templateId = useStudioStore((s) => s.templateId);

  const [composedUrl, setComposedUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const displayUrl = currentResultUrl || backgroundUrl;
  const [w, h] = DIMENSIONS[dimension] ?? DIMENSIONS["1:1"];
  const layout = getLayoutTemplate(templateId);

  useEffect(() => {
    if (!displayUrl) {
      setComposedUrl(null);
      return;
    }

    let cancelled = false;
    compose({
      width: w,
      height: h,
      backgroundUrl: displayUrl,
      headline,
      subheadline,
      cta,
      textEnabled: textOverlayEnabled,
      layout: layout.layout as ComposerLayout,
      typographyPresetId: layout.typographyPreset,
      templateId,
      vignetteEnabled: layout.moodRules.vignetteSubtle,
    })
      .then((canvas) => {
        if (cancelled) return;
        setComposedUrl(canvas.toDataURL("image/png"));
        canvasRef.current = canvas;
      })
      .catch(() => setComposedUrl(displayUrl));

    return () => {
      cancelled = true;
    };
  }, [displayUrl, headline, subheadline, cta, textOverlayEnabled, w, h, layout, templateId]);

  if (!displayUrl) return null;

  const src = composedUrl || displayUrl;
  return (
    <img
      src={src}
      alt="Composed preview"
      className="w-full h-full object-contain"
      style={{ maxHeight: "600px" }}
    />
  );
}

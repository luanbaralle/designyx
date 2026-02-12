/**
 * Typography layer — headline, subheadline, CTA with fitTextToBox + preset.
 * Premium micro-details: tracking, spacing, mood.
 */

import { fitTextToBox } from "../typography/fit-text";
import type { TypographyPreset } from "../typography/typography-presets";

export interface TypographyLayerInput {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  headline: string;
  subheadline: string;
  cta: string;
  textEnabled: boolean;
  textBounds: { x: number; y: number; w: number; h: number };
  preset?: TypographyPreset;
}

export interface TypographyLayout {
  headlineBounds: { x: number; y: number; w: number; h: number };
  subheadlineBounds: { x: number; y: number; w: number; h: number };
  ctaBounds: { x: number; y: number; w: number; h: number };
}

function applyLetterSpacing(ctx: CanvasRenderingContext2D, px: number): void {
  if ("letterSpacing" in ctx && typeof (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing === "string") {
    (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${px}px`;
  }
}

export function drawTypographyLayer(input: TypographyLayerInput): TypographyLayout {
  const { ctx, width, height, headline, subheadline, cta, textEnabled, textBounds, preset } = input;

  const headCfg = preset?.headline ?? { maxLines: 3, maxFontSize: 72, minFontSize: 42, tracking: 0 };
  const subCfg = preset?.subheadline ?? { maxLines: 2, maxFontSize: 32, minFontSize: 20, tracking: 0 };
  const ctaCfg = preset?.cta ?? { fontSize: 16, bottomAligned: true, glowSubtle: false };
  const spacing = preset?.spacing ?? { headlineToSub: 16, subToCta: 24, textZonePadding: 24 };

  const layout: TypographyLayout = {
    headlineBounds: { ...textBounds, h: 0 },
    subheadlineBounds: { x: textBounds.x, y: 0, w: textBounds.w, h: 0 },
    ctaBounds: { x: textBounds.x, y: 0, w: textBounds.w, h: 0 },
  };

  if (!textEnabled) return layout;

  const maxW = textBounds.w;
  let y = textBounds.y;

  if (headline) {
    const head = fitTextToBox({
      text: headline,
      maxWidth: maxW,
      maxFontSize: headCfg.maxFontSize,
      minFontSize: headCfg.minFontSize,
      maxLines: headCfg.maxLines,
    });
    ctx.save();
    ctx.font = `bold ${head.fontSize}px system-ui, sans-serif`;
    applyLetterSpacing(ctx, headCfg.tracking);
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "rgba(0,0,0,0.5)";
    ctx.lineWidth = 2;
    ctx.textBaseline = "top";
    for (let i = 0; i < head.lines.length; i++) {
      const lineY = y + i * head.lineHeight;
      ctx.strokeText(head.lines[i], textBounds.x, lineY);
      ctx.fillText(head.lines[i], textBounds.x, lineY);
    }
    layout.headlineBounds.h = head.lines.length * head.lineHeight;
    y += layout.headlineBounds.h + spacing.headlineToSub;
    ctx.restore();
  }

  if (subheadline) {
    const sub = fitTextToBox({
      text: subheadline,
      maxWidth: maxW,
      maxFontSize: subCfg.maxFontSize,
      minFontSize: subCfg.minFontSize,
      maxLines: subCfg.maxLines,
    });
    ctx.save();
    ctx.font = `${sub.fontSize}px system-ui, sans-serif`;
    applyLetterSpacing(ctx, subCfg.tracking);
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.textBaseline = "top";
    for (let i = 0; i < sub.lines.length; i++) {
      ctx.fillText(sub.lines[i], textBounds.x, y + i * sub.lineHeight);
    }
    layout.subheadlineBounds.y = y;
    layout.subheadlineBounds.h = sub.lines.length * sub.lineHeight;
    y += layout.subheadlineBounds.h + spacing.subToCta;
    ctx.restore();
  }

  if (cta) {
    const fontSize = ctaCfg.fontSize;
    ctx.save();
    ctx.font = `bold ${fontSize}px system-ui, sans-serif`;
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "rgba(0,0,0,0.3)";
    ctx.lineWidth = 1;
    ctx.textBaseline = "top";
    if (ctaCfg.glowSubtle) {
      ctx.shadowColor = "rgba(255,255,255,0.5)";
      ctx.shadowBlur = 8;
    }
    ctx.fillText(cta, textBounds.x, y);
    ctx.strokeText(cta, textBounds.x, y);
    ctx.shadowBlur = 0;
    layout.ctaBounds.y = y;
    layout.ctaBounds.h = fontSize * 1.4;
    ctx.restore();
  }

  return layout;
}

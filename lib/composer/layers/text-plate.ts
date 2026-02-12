/**
 * Text plate layer — luminance-aware plate opacity.
 * if (bgIsBright) plateOpacity = 0.55; if (bgIsDark) plateOpacity = 0.25
 */

import { getLuminanceAwarePlateOpacity } from "../apply-auto-polish";

export interface TextPlateLayerInput {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  textBounds: { x: number; y: number; w: number; h: number };
  padding?: number;
  radius?: number;
  opacity?: number;
  luminance?: number;
  useLuminanceAware?: boolean;
}

function sampleLuminance(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
): number {
  try {
    const imageData = ctx.getImageData(
      Math.max(0, Math.floor(x)),
      Math.max(0, Math.floor(y)),
      Math.min(ctx.canvas.width, Math.ceil(w), 100),
      Math.min(ctx.canvas.height, Math.ceil(h), 100)
    );
    const data = imageData.data;
    let sum = 0;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]! / 255;
      const g = data[i + 1]! / 255;
      const b = data[i + 2]! / 255;
      sum += 0.299 * r + 0.587 * g + 0.114 * b;
    }
    return data.length > 0 ? sum / (data.length / 4) : 0.5;
  } catch {
    return 0.5;
  }
}

export function drawTextPlateLayer(input: TextPlateLayerInput): void {
  const {
    ctx,
    width,
    height,
    textBounds,
    padding = 24,
    radius = 16,
    opacity = 0.5,
    luminance,
    useLuminanceAware = true,
  } = input;

  const x = Math.max(0, textBounds.x - padding);
  const y = Math.max(0, textBounds.y - padding);
  const w = Math.min(textBounds.w + padding * 2, width - x);
  const h = Math.min(textBounds.h + padding * 2, height - y);

  const lum = luminance ?? (useLuminanceAware ? sampleLuminance(ctx, x, y, w, h) : 0.5);
  const baseOpacity = useLuminanceAware ? getLuminanceAwarePlateOpacity(lum) : opacity;
  const finalOpacity = Math.max(0.2, Math.min(0.7, baseOpacity));

  ctx.save();
  ctx.globalAlpha = finalOpacity;
  ctx.fillStyle = "rgba(0,0,0,0.75)";
  ctx.beginPath();
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(x, y, w, h, radius);
  } else {
    ctx.rect(x, y, w, h);
  }
  ctx.fill();
  ctx.restore();
}

/**
 * AutoPolish — design heuristics pós-render.
 * Não é IA. É design heurístico como Canva Pro.
 */

export interface CanvasState {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  textBounds: { x: number; y: number; w: number; h: number };
  headlineHeight?: number;
  plateOpacity: number;
}

export interface PolishPlan {
  plateOpacityAdjust: number;
  vignetteOpacity: number;
  headlineScale?: number;
  ctaGlowOpacity?: number;
}

/**
 * Sample luminance from canvas region (0-1, dark to bright).
 */
function sampleLuminance(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
): number {
  const imageData = ctx.getImageData(
    Math.max(0, Math.floor(x)),
    Math.max(0, Math.floor(y)),
    Math.min(ctx.canvas.width, Math.ceil(w)),
    Math.min(ctx.canvas.height, Math.ceil(h))
  );
  const data = imageData.data;
  let sum = 0;
  let count = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]! / 255;
    const g = data[i + 1]! / 255;
    const b = data[i + 2]! / 255;
    sum += 0.299 * r + 0.587 * g + 0.114 * b;
    count++;
  }
  return count > 0 ? sum / count : 0.5;
}

/**
 * Apply design heuristics. Returns adjustments to apply.
 */
export function applyDesignHeuristics(
  state: CanvasState,
  basePlateOpacity: number,
  luminanceSample?: number
): PolishPlan {
  const luminance = luminanceSample ?? sampleLuminance(
    state.ctx,
    state.textBounds.x,
    state.textBounds.y,
    state.textBounds.w,
    state.textBounds.h
  );

  const plan: PolishPlan = {
    plateOpacityAdjust: 0,
    vignetteOpacity: 0,
  };

  if (luminance > 0.6) {
    plan.plateOpacityAdjust = 0.1;
  } else if (luminance < 0.25) {
    plan.plateOpacityAdjust = -0.15;
  }

  if (state.headlineHeight && state.headlineHeight > state.textBounds.h * 0.5) {
    plan.headlineScale = 0.9;
  }

  return plan;
}

/**
 * Luminance-aware plate opacity.
 * bgIsBright → plateOpacity higher
 * bgIsDark → plateOpacity lower
 */
export function getLuminanceAwarePlateOpacity(luminance: number): number {
  if (luminance > 0.6) return 0.55;
  if (luminance > 0.4) return 0.45;
  if (luminance > 0.25) return 0.35;
  return 0.25;
}

export interface ApplyVignetteOptions {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  strength?: number;
}

/**
 * Draw subtle vignette overlay — "fundo busy → aplica vignette leve".
 */
export function applyVignette({ ctx, width, height, strength = 0.35 }: ApplyVignetteOptions): void {
  const gradient = ctx.createRadialGradient(
    width / 2,
    height / 2,
    Math.min(width, height) * 0.3,
    width / 2,
    height / 2,
    Math.max(width, height) * 0.8
  );
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(0.5, "rgba(0,0,0,0)");
  gradient.addColorStop(1, `rgba(0,0,0,${strength})`);
  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

export interface ApplyAutoPolishInput {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  textBounds: { x: number; y: number; w: number; h: number };
  headlineHeight?: number;
  vignetteEnabled?: boolean;
}

/**
 * AutoPolish pass — final design heuristics on composed canvas.
 */
export function applyAutoPolish(input: ApplyAutoPolishInput): void {
  const { canvas, width, height, headlineHeight, vignetteEnabled = true } = input;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  if (vignetteEnabled) {
    applyVignette({ ctx, width, height, strength: 0.28 });
  }
}

/**
 * Floating elements layer — glows, abstract shapes, particles.
 */

export interface FloatingLayerInput {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  elements?: string[];
}

export function drawFloatingLayer(input: FloatingLayerInput): void {
  const { ctx, width, height } = input;

  ctx.save();
  ctx.globalAlpha = 0.15;

  const gradient = ctx.createRadialGradient(
    width * 0.2,
    height * 0.3,
    0,
    width * 0.2,
    height * 0.3,
    width * 0.4
  );
  gradient.addColorStop(0, "rgba(150,100,255,0.4)");
  gradient.addColorStop(1, "transparent");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  const gradient2 = ctx.createRadialGradient(
    width * 0.8,
    height * 0.7,
    0,
    width * 0.8,
    height * 0.7,
    width * 0.3
  );
  gradient2.addColorStop(0, "rgba(255,150,100,0.3)");
  gradient2.addColorStop(1, "transparent");
  ctx.fillStyle = gradient2;
  ctx.fillRect(0, 0, width, height);

  ctx.restore();
}

/**
 * Background layer — draws the background image.
 */

export interface BackgroundLayerInput {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  backgroundImage: HTMLImageElement | null;
  backgroundUrl: string | null;
}

export async function drawBackgroundLayer(input: BackgroundLayerInput): Promise<void> {
  const { ctx, width, height, backgroundImage, backgroundUrl } = input;

  if (!backgroundUrl) {
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, width, height);
    return;
  }

  if (backgroundImage) {
    ctx.drawImage(backgroundImage, 0, 0, width, height);
    return;
  }

  const img = new Image();
  img.crossOrigin = "anonymous";
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Failed to load background"));
    img.src = backgroundUrl;
  });
  ctx.drawImage(img, 0, 0, width, height);
}

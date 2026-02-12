/**
 * Asset Generator — background-only generation. Always passes prompt through sanitizer.
 */

import { generateWithImagen } from "@/core/providers/imagen";
import { saveGeneratedImage } from "@/lib/storage/saveGenerated";
import { sanitizePrompt } from "@/core/prompt/prompt-sanitizer";
import type { RenderStage } from "@/core/spec/render-plan";
import type { DesignFormat } from "@/core/spec/types";

export async function generateBackground(
  stage: RenderStage,
  userId: string,
  format?: DesignFormat
): Promise<string> {
  const sanitized = sanitizePrompt(stage.prompt, stage.constraints);
  const base64 = await generateWithImagen(sanitized);
  const imageUrl = await saveGeneratedImage(base64, userId);
  return imageUrl;
}

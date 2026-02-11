import { generateWithImagen } from "@/core/providers/imagen";
import { saveGeneratedImage } from "@/lib/storage/saveGenerated";

export async function renderImage(prompt: string, userId: string) {
  const base64 = await generateWithImagen(prompt);
  const imageUrl = await saveGeneratedImage(base64, userId);
  return imageUrl;
}

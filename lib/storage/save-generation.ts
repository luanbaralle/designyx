/**
 * Save generation — spec.json, background.png, final.png to Supabase.
 */

import { createClient } from "@/lib/supabase/server";
import type { CreativeSpec } from "@/core/spec/types";

export interface SaveGenerationInput {
  userId: string;
  spec: CreativeSpec;
  backgroundUrl: string;
  finalPngBase64: string;
}

export interface SaveGenerationResult {
  generationId: string;
  specPath: string;
  backgroundPath: string;
  finalPath: string;
  finalUrl: string;
}

export async function saveGeneration(
  input: SaveGenerationInput
): Promise<SaveGenerationResult> {
  const supabase = await createClient();
  const generationId = crypto.randomUUID();
  const prefix = `${input.userId}/generations/${generationId}`;

  const specPath = `${prefix}/spec.json`;
  const backgroundPath = `${prefix}/background.png`;
  const finalPath = `${prefix}/final.png`;

  const specBlob = new Blob([JSON.stringify(input.spec, null, 2)], {
    type: "application/json",
  });

  const { error: specError } = await supabase.storage
    .from("designyx-uploads")
    .upload(specPath, specBlob, { contentType: "application/json", upsert: true });

  if (specError) throw specError;

  const backgroundRes = await fetch(input.backgroundUrl);
  const backgroundBlob = await backgroundRes.blob();
  const { error: bgError } = await supabase.storage
    .from("designyx-uploads")
    .upload(backgroundPath, backgroundBlob, { contentType: "image/png", upsert: true });

  if (bgError) throw bgError;

  const finalBuffer = Buffer.from(input.finalPngBase64, "base64");
  const { error: finalError } = await supabase.storage
    .from("designyx-uploads")
    .upload(finalPath, finalBuffer, { contentType: "image/png", upsert: true });

  if (finalError) throw finalError;

  const { data: finalUrlData } = supabase.storage
    .from("designyx-uploads")
    .getPublicUrl(finalPath);

  return {
    generationId,
    specPath,
    backgroundPath,
    finalPath,
    finalUrl: finalUrlData.publicUrl,
  };
}

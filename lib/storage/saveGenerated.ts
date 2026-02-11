import { createClient } from "@/lib/supabase/server";

export async function saveGeneratedImage(base64: string, userId: string) {
  const supabase = await createClient();

  const buffer = Buffer.from(base64, "base64");
  const filePath = `${userId}/generated/${Date.now()}.png`;

  const { error } = await supabase.storage
    .from("designyx-uploads")
    .upload(filePath, buffer, {
      contentType: "image/png",
      upsert: true,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from("designyx-uploads")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

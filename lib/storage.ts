import { createClient } from "./supabase/server";

const BUCKET = "designyx-uploads";

export type UploadType = "subject" | "style_ref";

export async function getUploadUrl(
  userId: string,
  file: File,
  type: UploadType
): Promise<{ path: string; url: string } | null> {
  const supabase = await createClient();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${userId}/${type}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) return null;

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(path);

  return { path, url: publicUrl };
}

export async function recordUpload(
  userId: string,
  fileUrl: string,
  type: UploadType
) {
  const supabase = await createClient();
  const { error } = await supabase.from("uploads").insert({
    user_id: userId,
    file_url: fileUrl,
    type,
  });
  return !error;
}

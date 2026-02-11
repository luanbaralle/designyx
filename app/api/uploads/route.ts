import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getUploadUrl, recordUpload, type UploadType } from "@/lib/storage";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const type = (formData.get("type") as UploadType) || "subject";

    if (!file || !["subject", "style_ref"].includes(type)) {
      return NextResponse.json(
        { error: "Missing file or invalid type (subject | style_ref)" },
        { status: 400 }
      );
    }

    const result = await getUploadUrl(user.id, file, type);
    if (!result) {
      return NextResponse.json(
        { error: "Upload failed" },
        { status: 500 }
      );
    }

    await recordUpload(user.id, result.url, type);

    return NextResponse.json({ url: result.url });
  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}

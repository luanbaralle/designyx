import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { saveGeneration } from "@/lib/storage/save-generation";
import type { CreativeSpec } from "@/core/spec/types";

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

    const body = await request.json();
    const { spec, backgroundUrl, finalPng } = body as {
      spec: CreativeSpec;
      backgroundUrl: string;
      finalPng: string;
    };

    if (!spec || !backgroundUrl || !finalPng) {
      return NextResponse.json(
        { error: "spec, backgroundUrl, finalPng required" },
        { status: 400 }
      );
    }

    const base64 = finalPng.replace(/^data:image\/png;base64,/, "");
    const result = await saveGeneration({
      userId: user.id,
      spec,
      backgroundUrl,
      finalPngBase64: base64,
    });

    const { data: urlData } = supabase.storage
      .from("designyx-uploads")
      .getPublicUrl(result.finalPath);

    await supabase.from("generations").insert({
      user_id: user.id,
      prompt: null,
      style: spec.style.preset,
      image_url: urlData.publicUrl,
      status: "success",
    });

    return NextResponse.json({
      generationId: result.generationId,
      specPath: result.specPath,
      backgroundPath: result.backgroundPath,
      finalPath: result.finalPath,
    });
  } catch (e) {
    console.error("Save generation error:", e);
    return NextResponse.json(
      { error: "Save failed" },
      { status: 500 }
    );
  }
}

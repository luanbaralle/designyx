import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { hasEnoughCredits, deductCredit } from "@/lib/credits";
import { runPipeline } from "@/core/engine/pipeline";

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

    const ok = await hasEnoughCredits(user.id);
    if (!ok) {
      return NextResponse.json(
        { error: "Insufficient credits" },
        { status: 402 }
      );
    }

    const body = await request.json();
    const {
      subjectUrl,
      style = "cinematic",
      composition = "medium-shot",
      lighting = "cinematic",
      headline,
      subheadline,
      cta,
      niche,
      environment,
    } = body as {
      subjectUrl?: string;
      style?: string;
      composition?: string;
      lighting?: string;
      headline?: string;
      subheadline?: string;
      cta?: string;
      niche?: string;
      environment?: string;
    };

    if (!subjectUrl) {
      return NextResponse.json(
        { error: "subjectUrl is required" },
        { status: 400 }
      );
    }

    const deducted = await deductCredit(user.id);
    if (!deducted) {
      return NextResponse.json(
        { error: "Could not deduct credit" },
        { status: 402 }
      );
    }

    const result = await runPipeline({
      subjectUrl,
      style,
      composition,
      lighting,
      headline,
      subheadline,
      cta,
      niche,
      environment,
    });

    await supabase.from("generations").insert({
      user_id: user.id,
      prompt: result.prompt,
      style,
      image_url: result.imageUrl || null,
      status: result.status,
    });

    return NextResponse.json({
      imageUrl: result.imageUrl,
      status: result.status,
      log: result.log,
      error: result.error,
    });
  } catch (e) {
    console.error("Generate error:", e);
    return NextResponse.json(
      { error: "Generation failed" },
      { status: 500 }
    );
  }
}

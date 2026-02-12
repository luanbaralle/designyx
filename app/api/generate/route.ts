import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { hasEnoughCredits, deductCredit } from "@/lib/credits";
import { runPipeline } from "@/core/engine/pipeline";
import {
  buildCreativeSpecFromAPI,
  type ApiCreativeSpecBody,
} from "@/core/spec/creative-spec";

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

    const body = (await request.json()) as ApiCreativeSpecBody;

    const deducted = await deductCredit(user.id);
    if (!deducted) {
      return NextResponse.json(
        { error: "Could not deduct credit" },
        { status: 402 }
      );
    }

    const spec = buildCreativeSpecFromAPI({
      ...body,
      subjectUrl: body.subjectUrl ?? undefined,
    });
    const result = await runPipeline({ userId: user.id, spec });

    if (result.status === "error") {
      return NextResponse.json(
        { error: result.error, log: result.log },
        { status: 500 }
      );
    }
    await supabase.from("generations").insert({
      user_id: user.id,
      prompt: null,
      style: spec.style.preset,
      image_url: result.backgroundUrl,
      status: result.status,
    });

    return NextResponse.json({
      status: result.status,
      backgroundUrl: result.backgroundUrl,
      imageUrl: result.backgroundUrl,
      log: result.log,
    });
  } catch (e) {
    console.error("Generate error:", e);
    return NextResponse.json(
      { error: "Generation failed" },
      { status: 500 }
    );
  }
}

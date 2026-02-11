import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("users")
      .select("credits")
      .eq("id", user.id)
      .single();

    if (error || !data) {
      return NextResponse.json({ credits: 0 });
    }

    return NextResponse.json({ credits: data.credits ?? 0 });
  } catch (e) {
    console.error("Credits error:", e);
    return NextResponse.json({ credits: 0 }, { status: 500 });
  }
}

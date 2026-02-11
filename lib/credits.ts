import { createClient } from "./supabase/server";

const CREDIT_COST_PER_GENERATION = 1;

export async function getCredits(userId: string): Promise<number> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .select("credits")
    .eq("id", userId)
    .single();

  if (error || !data) return 0;
  return data.credits ?? 0;
}

export async function deductCredit(userId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data: user } = await supabase
    .from("users")
    .select("credits")
    .eq("id", userId)
    .single();

  if (!user || user.credits < CREDIT_COST_PER_GENERATION) return false;

  const { error } = await supabase
    .from("users")
    .update({ credits: user.credits - CREDIT_COST_PER_GENERATION })
    .eq("id", userId);

  return !error;
}

export async function hasEnoughCredits(userId: string): Promise<boolean> {
  const credits = await getCredits(userId);
  return credits >= CREDIT_COST_PER_GENERATION;
}

export { CREDIT_COST_PER_GENERATION };

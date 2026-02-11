/**
 * Critic — Master Spec §8
 * Refines prompt: issues + fix suggestion. Current: rule-based passes. Production: Gemini Vision.
 */

const PASS1_APPEND =
  " Ensure photorealistic quality, premium commercial look, no distortion.";

const PASS2_APPEND =
  " Clean typography integration, no text artifacts, no blur on letters, print-ready.";

export function criticPass1(rawPrompt: string): string {
  return rawPrompt + PASS1_APPEND;
}

export function criticPass2(promptAfterPass1: string): string {
  return promptAfterPass1 + PASS2_APPEND;
}

/** Rule-based refinement (no Vision API yet). Returns refined prompt. */
export function refinePrompt(rawPrompt: string): string {
  const after1 = criticPass1(rawPrompt);
  const after2 = criticPass2(after1);
  return after2;
}

/**
 * Stub for Gemini Vision Critic. In production: send image + prompt, get { issues, fix }.
 */
export async function visionCritic(
  _imageUrl: string,
  _prompt: string
): Promise<{ issues: string[]; fix: string }> {
  return {
    issues: [],
    fix: "",
  };
}

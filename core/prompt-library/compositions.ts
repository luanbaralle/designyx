export const COMPOSITION_PRESETS: Record<string, string> = {
  "close-up":
    "close-up portrait, face and shoulders, intimate framing, shallow depth of field",
  "medium-shot":
    "medium shot, bust and upper body, professional portrait framing",
  "american-shot":
    "american shot, full figure from knees up, environmental portrait",
  full: "full body, head to toe, environmental context, wide frame",
};

export function getCompositionPrompt(compositionKey: string): string {
  return COMPOSITION_PRESETS[compositionKey] ?? COMPOSITION_PRESETS["medium-shot"];
}

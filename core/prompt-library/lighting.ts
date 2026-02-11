export const LIGHTING_PRESETS: Record<string, string> = {
  cinematic:
    "cinematic lighting, three-point setup, soft key light, subtle rim, film look",
  dramatic: "dramatic lighting, high contrast, strong shadows, moody",
  soft: "soft diffused lighting, even fill, flattering, minimal shadows",
  neon: "neon accents, colored rim light, cyberpunk-inspired",
  natural: "natural window light, soft direction, realistic",
  studio: "studio lighting, controlled, professional portrait setup",
};

export function getLightingPrompt(lightingKey: string): string {
  return LIGHTING_PRESETS[lightingKey] ?? LIGHTING_PRESETS.cinematic;
}

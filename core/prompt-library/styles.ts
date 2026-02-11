export const STYLE_PRESETS: Record<string, string> = {
  glassmorphism:
    "glassmorphism, frosted glass panels, soft transparency, modern UI, clean edges",
  "ultra-realistic":
    "ultra realistic, photorealistic, 8k, professional photography, sharp focus",
  cinematic:
    "cinematic, film grain, anamorphic lens, dramatic lighting, movie still",
  minimalist:
    "minimalist, clean composition, negative space, subtle gradients",
  elegant: "elegant, luxury, premium, refined, sophisticated atmosphere",
  technological: "technological, futuristic, neon accents, digital, tech aesthetic",
  institutional: "institutional, corporate, professional, trustworthy",
  cartoon: "stylized cartoon, illustrated, vibrant colors, clean lines",
  gamer: "gamer aesthetic, RGB glow, gaming setup, dynamic lighting",
  "glow-cinematic":
    "cinematic glow, rim lighting, premium look, shallow depth of field",
  classic: "classic, timeless, traditional composition",
  formal: "formal, business, serious tone, clean background",
  sexy: "sophisticated glamour, soft lighting, premium portrait",
  "ui-interface": "UI interface style, app mockup, screen design, modern",
};

export function getStylePrompt(styleKey: string): string {
  return STYLE_PRESETS[styleKey] ?? STYLE_PRESETS.cinematic;
}

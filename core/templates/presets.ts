/**
 * Default template presets (can be overridden by DB templates table).
 * Master Spec §4 — JSON structure.
 */

import type { TemplatePreset, TemplateId } from "./types";

export const DEFAULT_TEMPLATES: Record<TemplateId, TemplatePreset> = {
  professional_headshot: {
    id: "professional_headshot",
    name: "Foto profissional",
    basePrompt:
      "studio portrait, softbox lighting, sharp skin texture, corporate headshot",
    negativePrompt: "blurry, cartoon, plastic skin, distorted",
    defaultStyle: "sobrio",
  },
  gamer_thumbnail: {
    id: "gamer_thumbnail",
    name: "Gamer thumbnail",
    basePrompt:
      "gaming setup, dynamic lighting, RGB accents, streamer aesthetic, vibrant",
    negativePrompt: "boring, flat lighting, corporate",
    defaultStyle: "cinematic",
  },
  influencer_lifestyle: {
    id: "influencer_lifestyle",
    name: "Influencer lifestyle",
    basePrompt:
      "lifestyle photography, natural light, aspirational, premium aesthetic",
    negativePrompt: "harsh shadows, amateur, cluttered",
    defaultStyle: "balanced",
  },
  corporate_branding: {
    id: "corporate_branding",
    name: "Branding corporativo",
    basePrompt:
      "institutional, professional, trustworthy, clean background, business",
    negativePrompt: "casual, flashy, distorted",
    defaultStyle: "sobrio",
  },
  cinematic_portrait: {
    id: "cinematic_portrait",
    name: "Retrato cinematográfico",
    basePrompt:
      "cinematic, film grain, dramatic lighting, movie still, 8k",
    negativePrompt: "flat, amateur, overexposed",
    defaultStyle: "cinematic",
  },
};

export function getTemplate(id: string): TemplatePreset | null {
  return DEFAULT_TEMPLATES[id as TemplateId] ?? null;
}

export function listTemplateIds(): TemplateId[] {
  return Object.keys(DEFAULT_TEMPLATES) as TemplateId[];
}

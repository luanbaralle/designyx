/**
 * Template Engine (Preset System) — Master Spec §4
 * Presets prontos: foto profissional, gamer thumbnail, influencer lifestyle, branding corporativo.
 */

export interface TemplatePreset {
  id: string;
  name: string;
  basePrompt: string;
  negativePrompt: string;
  defaultStyle: string; // e.g. "sobrio" | "balanced" | "cinematic"
}

export type TemplateId =
  | "professional_headshot"
  | "gamer_thumbnail"
  | "influencer_lifestyle"
  | "corporate_branding"
  | "cinematic_portrait";

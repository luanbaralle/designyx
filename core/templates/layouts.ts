/**
 * Layout templates — background constraints + typography preset + mood.
 * Template controla hierarchy emocional, não só layout.
 */

import type { TemplateId } from "@/core/spec/types";
import type { ReservedSpace } from "@/core/spec/render-plan";
import type { TypographyPresetId } from "@/lib/composer/typography/typography-presets";

export interface MoodRules {
  minWhitespace: number;
  plateOpacityRange: [number, number];
  vignetteSubtle: boolean;
}

export interface LayoutTemplate {
  id: TemplateId;
  name: string;
  layout: string;
  reservedSpace: ReservedSpace;
  backgroundConstraint: string;
  typographyPreset: TypographyPresetId;
  spacingPreset: "compact" | "balanced" | "spacious";
  moodRules: MoodRules;
}

export const LAYOUT_TEMPLATES: Record<TemplateId, LayoutTemplate> = {
  lux_ad_01: {
    id: "lux_ad_01",
    name: "Lux Ad",
    layout: "text_right",
    reservedSpace: { side: "right", percent: 55 },
    backgroundConstraint: "empty space on right side for typography, subjectless zone, clean area",
    typographyPreset: "lux_minimal",
    spacingPreset: "spacious",
    moodRules: {
      minWhitespace: 0.25,
      plateOpacityRange: [0.4, 0.6],
      vignetteSubtle: true,
    },
  },
  text_overlay_center_01: {
    id: "text_overlay_center_01",
    name: "Text Overlay Center",
    layout: "text_overlay_center",
    reservedSpace: { side: "center", percent: 40 },
    backgroundConstraint: "empty space in center, soft focus area, subjectless zone",
    typographyPreset: "centered_overlay",
    spacingPreset: "balanced",
    moodRules: {
      minWhitespace: 0.2,
      plateOpacityRange: [0.45, 0.65],
      vignetteSubtle: true,
    },
  },
  minimal_editorial_01: {
    id: "minimal_editorial_01",
    name: "Minimal Editorial",
    layout: "text_left",
    reservedSpace: { side: "left", percent: 50 },
    backgroundConstraint: "empty space on left side for typography, subjectless zone",
    typographyPreset: "minimal_editorial",
    spacingPreset: "spacious",
    moodRules: {
      minWhitespace: 0.3,
      plateOpacityRange: [0.35, 0.55],
      vignetteSubtle: false,
    },
  },
  hero_left_01: {
    id: "hero_left_01",
    name: "Hero Left",
    layout: "subject_left_text_right",
    reservedSpace: { side: "right", percent: 55 },
    backgroundConstraint: "empty space on right side for typography, subjectless zone",
    typographyPreset: "hero_bold",
    spacingPreset: "balanced",
    moodRules: {
      minWhitespace: 0.2,
      plateOpacityRange: [0.4, 0.6],
      vignetteSubtle: true,
    },
  },
  hero_right_01: {
    id: "hero_right_01",
    name: "Hero Right",
    layout: "subject_right_text_left",
    reservedSpace: { side: "left", percent: 55 },
    backgroundConstraint: "empty space on left side for typography, subjectless zone",
    typographyPreset: "hero_bold",
    spacingPreset: "balanced",
    moodRules: {
      minWhitespace: 0.2,
      plateOpacityRange: [0.4, 0.6],
      vignetteSubtle: true,
    },
  },
};

export function getLayoutTemplate(id: TemplateId): LayoutTemplate {
  return LAYOUT_TEMPLATES[id] ?? LAYOUT_TEMPLATES.lux_ad_01;
}

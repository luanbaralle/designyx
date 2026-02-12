/**
 * Typography presets — hierarchy emocional por template.
 * Template controla: headline max lines, tracking, CTA alignment, spacing.
 */

export type TypographyPresetId =
  | "lux_minimal"
  | "editorial_balanced"
  | "hero_bold"
  | "centered_overlay"
  | "minimal_editorial";

export interface TypographyPreset {
  id: TypographyPresetId;
  name: string;
  headline: {
    maxLines: number;
    maxFontSize: number;
    minFontSize: number;
    tracking: number; // letter-spacing em px
    letterSpacingEm?: number;
  };
  subheadline: {
    maxLines: number;
    maxFontSize: number;
    minFontSize: number;
    tracking: number;
  };
  cta: {
    fontSize: number;
    bottomAligned: boolean;
    glowSubtle: boolean;
  };
  spacing: {
    headlineToSub: number;
    subToCta: number;
    textZonePadding: number;
  };
  mood: "minimal" | "balanced" | "bold" | "overlay" | "editorial";
}

export const TYPOGRAPHY_PRESETS: Record<TypographyPresetId, TypographyPreset> = {
  lux_minimal: {
    id: "lux_minimal",
    name: "Luxury Minimal",
    headline: {
      maxLines: 1,
      maxFontSize: 64,
      minFontSize: 40,
      tracking: -0.5,
      letterSpacingEm: -0.02,
    },
    subheadline: {
      maxLines: 1,
      maxFontSize: 24,
      minFontSize: 18,
      tracking: 1.5,
    },
    cta: {
      fontSize: 14,
      bottomAligned: true,
      glowSubtle: true,
    },
    spacing: {
      headlineToSub: 12,
      subToCta: 32,
      textZonePadding: 32,
    },
    mood: "minimal",
  },
  editorial_balanced: {
    id: "editorial_balanced",
    name: "Editorial Balanced",
    headline: {
      maxLines: 2,
      maxFontSize: 72,
      minFontSize: 42,
      tracking: 0,
      letterSpacingEm: 0,
    },
    subheadline: {
      maxLines: 2,
      maxFontSize: 32,
      minFontSize: 20,
      tracking: 0.5,
    },
    cta: {
      fontSize: 16,
      bottomAligned: true,
      glowSubtle: false,
    },
    spacing: {
      headlineToSub: 16,
      subToCta: 24,
      textZonePadding: 24,
    },
    mood: "balanced",
  },
  hero_bold: {
    id: "hero_bold",
    name: "Hero Bold",
    headline: {
      maxLines: 3,
      maxFontSize: 80,
      minFontSize: 48,
      tracking: -1,
      letterSpacingEm: -0.03,
    },
    subheadline: {
      maxLines: 2,
      maxFontSize: 36,
      minFontSize: 22,
      tracking: 0,
    },
    cta: {
      fontSize: 18,
      bottomAligned: true,
      glowSubtle: true,
    },
    spacing: {
      headlineToSub: 20,
      subToCta: 28,
      textZonePadding: 28,
    },
    mood: "bold",
  },
  centered_overlay: {
    id: "centered_overlay",
    name: "Centered Overlay",
    headline: {
      maxLines: 2,
      maxFontSize: 56,
      minFontSize: 36,
      tracking: 0,
      letterSpacingEm: 0,
    },
    subheadline: {
      maxLines: 2,
      maxFontSize: 28,
      minFontSize: 18,
      tracking: 0.5,
    },
    cta: {
      fontSize: 14,
      bottomAligned: true,
      glowSubtle: true,
    },
    spacing: {
      headlineToSub: 14,
      subToCta: 24,
      textZonePadding: 28,
    },
    mood: "overlay",
  },
  minimal_editorial: {
    id: "minimal_editorial",
    name: "Minimal Editorial",
    headline: {
      maxLines: 1,
      maxFontSize: 52,
      minFontSize: 36,
      tracking: -0.3,
      letterSpacingEm: -0.015,
    },
    subheadline: {
      maxLines: 1,
      maxFontSize: 22,
      minFontSize: 16,
      tracking: 2,
    },
    cta: {
      fontSize: 13,
      bottomAligned: true,
      glowSubtle: false,
    },
    spacing: {
      headlineToSub: 10,
      subToCta: 28,
      textZonePadding: 28,
    },
    mood: "editorial",
  },
};

export function getTypographyPreset(id: TypographyPresetId): TypographyPreset {
  return TYPOGRAPHY_PRESETS[id] ?? TYPOGRAPHY_PRESETS.editorial_balanced;
}

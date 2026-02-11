/**
 * Style Matrix — Master Spec §7
 * Slider 0–100: Corporate clean (0–30) | Balanced (30–70) | Vibrant cinematic (70–100).
 */

export function getStyleMatrixSuffix(styleScore: number): string {
  if (styleScore <= 30) {
    return " corporate clean, minimal, professional, neutral tones";
  }
  if (styleScore <= 70) {
    return " balanced composition, refined lighting, premium look";
  }
  return " vibrant colors, cinematic lens flare, dramatic, 8k";
}

export function clampStyleScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

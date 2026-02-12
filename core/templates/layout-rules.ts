/**
 * Layout rules — safe margins, focal zones, hierarchy.
 */

export const SAFE_MARGIN_PERCENT = 0.06;
export const HEADLINE_MAX_WIDTH_PERCENT = 0.7;
export const CTA_BOTTOM_ALIGNED = true;

export interface LayoutRules {
  safeMargin: number;
  headlineMaxWidth: number;
  ctaBottomAligned: boolean;
  focalZone: "left" | "center" | "right";
}

export function getLayoutRules(focalZone: "left" | "center" | "right"): LayoutRules {
  return {
    safeMargin: SAFE_MARGIN_PERCENT,
    headlineMaxWidth: HEADLINE_MAX_WIDTH_PERCENT,
    ctaBottomAligned: CTA_BOTTOM_ALIGNED,
    focalZone,
  };
}

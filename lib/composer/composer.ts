/**
 * Composer — executes layer stack. Photoshop mini.
 * layers = [Background, Floating, TextPlate, Typography] + AutoPolish
 */

import { drawBackgroundLayer } from "./layers/background";
import { drawTextPlateLayer } from "./layers/text-plate";
import { drawFloatingLayer } from "./layers/floating";
import { drawTypographyLayer } from "./layers/typography";
import { applyAutoPolish } from "./apply-auto-polish";
import { getTypographyPreset } from "./typography/typography-presets";
import type { TypographyPresetId } from "./typography/typography-presets";

export type ComposerLayout = "text_right" | "text_left" | "text_overlay_center";

export interface ComposerInput {
  width: number;
  height: number;
  backgroundUrl: string | null;
  backgroundImage?: HTMLImageElement | null;
  headline: string;
  subheadline: string;
  cta: string;
  textEnabled: boolean;
  layout?: ComposerLayout;
  typographyPresetId?: TypographyPresetId;
  templateId?: string;
  vignetteEnabled?: boolean;
}

const LAYOUT_MAP: Record<string, ComposerLayout> = {
  text_right: "text_right",
  text_left: "text_left",
  text_overlay_center: "text_overlay_center",
  subject_left_text_right: "text_right",
  subject_right_text_left: "text_left",
};

const SAFE_MARGIN = 0.06;

export async function compose(input: ComposerInput): Promise<HTMLCanvasElement> {
  const {
    width,
    height,
    backgroundUrl,
    backgroundImage,
    headline,
    subheadline,
    cta,
    textEnabled,
    layout: layoutKey = "text_right",
    typographyPresetId = "editorial_balanced",
    vignetteEnabled = true,
  } = input;

  const layout = LAYOUT_MAP[layoutKey] ?? "text_right";

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2d not available");

  const preset = getTypographyPreset(typographyPresetId);

  const marginX = width * SAFE_MARGIN;
  const marginY = height * SAFE_MARGIN;
  const textZoneWidth = width * 0.55;
  const textZoneHeight = height - marginY * 2;

  let textX: number;
  if (layout === "text_right") {
    textX = width - marginX - textZoneWidth;
  } else if (layout === "text_left") {
    textX = marginX;
  } else {
    textX = (width - textZoneWidth) / 2;
  }

  const textBounds = {
    x: textX,
    y: marginY + textZoneHeight * 0.2,
    w: textZoneWidth,
    h: textZoneHeight * 0.6,
  };

  await drawBackgroundLayer({
    ctx,
    width,
    height,
    backgroundImage: backgroundImage ?? null,
    backgroundUrl,
  });

  drawFloatingLayer({ ctx, width, height });

  const plateBounds = {
    x: textBounds.x,
    y: textBounds.y - 24,
    w: textBounds.w,
    h: textBounds.h,
  };

  if (textEnabled && (headline || subheadline || cta)) {
    drawTextPlateLayer({
      ctx,
      width,
      height,
      textBounds: plateBounds,
    });
  }

  const typographyLayout = drawTypographyLayer({
    ctx,
    width,
    height,
    headline,
    subheadline,
    cta,
    textEnabled,
    textBounds,
    preset,
  });

  applyAutoPolish({
    canvas,
    width,
    height,
    textBounds,
    headlineHeight: typographyLayout.headlineBounds.h,
    vignetteEnabled,
  });

  return canvas;
}

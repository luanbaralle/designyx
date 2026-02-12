/**
 * Export — Asset + Metadata + presetId
 */

import type { CreativeSpec } from "@/core/spec/types";
import { getLayoutTemplate } from "@/core/templates/layouts";
import { getTypographyPreset } from "./typography/typography-presets";

export interface ExportAssetMetadata {
  finalPng: string;
  spec: CreativeSpec;
  templateId: string;
  typographyPresetId: string;
  backgroundUrl: string | null;
  typographyConfig: {
    headline: { maxFontSize: number; minFontSize: number; maxLines: number };
    subheadline: { maxFontSize: number; minFontSize: number; maxLines: number };
    cta: { fontSize: number };
  };
}

export function exportToAssetMetadata(
  canvas: HTMLCanvasElement,
  spec: CreativeSpec,
  backgroundUrl: string | null
): ExportAssetMetadata {
  const finalPng = canvas.toDataURL("image/png");
  const layout = getLayoutTemplate(spec.templateId);
  const preset = getTypographyPreset(layout.typographyPreset);

  return {
    finalPng,
    spec,
    templateId: spec.templateId,
    typographyPresetId: layout.typographyPreset,
    backgroundUrl,
    typographyConfig: {
      headline: {
        maxFontSize: preset.headline.maxFontSize,
        minFontSize: preset.headline.minFontSize,
        maxLines: preset.headline.maxLines,
      },
      subheadline: {
        maxFontSize: preset.subheadline.maxFontSize,
        minFontSize: preset.subheadline.minFontSize,
        maxLines: preset.subheadline.maxLines,
      },
      cta: { fontSize: preset.cta.fontSize },
    },
  };
}

export function downloadPng(canvas: HTMLCanvasElement, filename = "designyx-export.png"): void {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export function downloadAssetMetadata(asset: ExportAssetMetadata, filename = "designyx-export.json"): void {
  const link = document.createElement("a");
  link.download = filename;
  link.href = URL.createObjectURL(new Blob([JSON.stringify(asset, null, 2)], { type: "application/json" }));
  link.click();
  URL.revokeObjectURL(link.href);
}

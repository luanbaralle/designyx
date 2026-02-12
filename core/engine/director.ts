/**
 * Director — compilador determinístico. Compila CreativeSpec → RenderPlan.
 * Não inventa prompt. Usa template rules e constraints.
 */

import type { CreativeSpec } from "@/core/spec/types";
import type { RenderPlan, RenderStage } from "@/core/spec/render-plan";
import { getLayoutTemplate } from "@/core/templates/layouts";
import { getStyleMatrixSuffix } from "@/core/style-matrix";
import { getStylePrompt } from "@/core/prompt-library/styles";
import { getLightingPrompt } from "@/core/prompt-library/lighting";

function buildBackgroundPrompt(spec: CreativeSpec): string {
  const env = spec.scene.environment || spec.scene.niche || "luxury office";
  const style = getStylePrompt(spec.style.preset);
  const lighting = getLightingPrompt(spec.scene.lighting || "cinematic");
  const layout = getLayoutTemplate(spec.templateId);
  const score = spec.style.attributesScore ?? 50;
  const matrixSuffix = getStyleMatrixSuffix(score);

  const parts: string[] = [
    `${env} background`,
    style,
    lighting,
    "soft depth of field",
    layout.backgroundConstraint,
  ];

  if (spec.style.advancedPrompt) {
    parts.push(spec.style.advancedPrompt);
  }

  return (parts.filter(Boolean).join(", ") + matrixSuffix).trim();
}

export function buildRenderPlan(spec: CreativeSpec): RenderPlan {
  const layout = getLayoutTemplate(spec.templateId);
  const backgroundPrompt = buildBackgroundPrompt(spec);

  const stage: RenderStage = {
    stage: "background",
    prompt: backgroundPrompt,
    constraints: {
      no_people: true,
      no_text: true,
      no_logo: true,
      no_watermark: true,
      empty_right_side: layout.reservedSpace.side === "right",
      empty_left_side: layout.reservedSpace.side === "left",
      subjectless_zone: layout.reservedSpace.side,
    },
    layout: layout.layout,
    reservedSpace: layout.reservedSpace,
    templateRules: [layout.backgroundConstraint],
  };

  return {
    goal: "premium ad",
    templateId: spec.templateId,
    creativeSpec: spec,
    stages: [stage],
  };
}

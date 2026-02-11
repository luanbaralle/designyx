import { compilePrompt } from "@/core/prompt-library/compiler";
import { getStyleMatrixSuffix } from "@/core/style-matrix";

export interface DirectorInput {
  subjectUrl: string;
  style: string;
  composition: string;
  lighting: string;
  templateId?: string;
  styleScore?: number; // 0–100, Master Spec §7
  headline?: string;
  subheadline?: string;
  cta?: string;
  niche?: string;
  environment?: string;
}

export function buildPrompt(input: DirectorInput): string {
  const prompt = compilePrompt({
    subject: {
      subjectId: "",
      imageUrl: input.subjectUrl,
      lockFace: true,
    },
    templateId: input.templateId,
    styleKey: input.style,
    compositionKey: input.composition,
    lightingKey: input.lighting,
    environment: input.environment ?? input.niche,
    headline: input.headline,
    subheadline: input.subheadline,
    cta: input.cta,
  });

  const score = input.styleScore ?? 50;
  const matrixSuffix = getStyleMatrixSuffix(score);
  return (prompt + matrixSuffix).trim();
}

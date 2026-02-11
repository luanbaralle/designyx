/**
 * Prompt Compiler — Master Spec §6
 * Joins modular blocks: subject, lighting, composition, template, style, background.
 */

import type { SubjectAnchor } from "@/core/subject-lock";
import { getTemplate } from "@/core/templates";
import {
  subjectBlock,
  lightingBlock,
  compositionBlock,
  styleBlock,
  backgroundBlock,
} from "./blocks";

export interface CompilerInput {
  subject: SubjectAnchor;
  templateId?: string;
  styleKey: string;
  compositionKey: string;
  lightingKey: string;
  environment?: string;
  /** Text overlay */
  headline?: string;
  subheadline?: string;
  cta?: string;
  /** Extra prompt from template basePrompt */
  templateBasePrompt?: string;
  templateNegativePrompt?: string;
}

export function compilePrompt(input: CompilerInput): string {
  const parts: string[] = [];

  parts.push(subjectBlock(input.subject));
  if (input.templateBasePrompt) parts.push(input.templateBasePrompt);
  else if (input.templateId) {
    const t = getTemplate(input.templateId);
    if (t) parts.push(t.basePrompt);
  }
  parts.push(lightingBlock(input.lightingKey));
  parts.push(compositionBlock(input.compositionKey));
  parts.push(backgroundBlock(input.environment));
  parts.push(styleBlock(input.styleKey));

  let prompt = parts.filter(Boolean).join(", ");

  if (input.headline || input.subheadline || input.cta) {
    const textParts: string[] = [];
    if (input.headline) textParts.push(`Headline: "${input.headline}"`);
    if (input.subheadline) textParts.push(`Subheadline: "${input.subheadline}"`);
    if (input.cta) textParts.push(`CTA: "${input.cta}"`);
    prompt += `. ${textParts.join(". ")}. Integrate text cleanly, typography-safe, no artifacts.`;
  }

  return prompt.trim();
}

export function getNegativePrompt(input: CompilerInput): string {
  if (input.templateNegativePrompt) return input.templateNegativePrompt;
  const t = input.templateId ? getTemplate(input.templateId) : null;
  return t?.negativePrompt ?? "blurry, distorted, low quality";
}

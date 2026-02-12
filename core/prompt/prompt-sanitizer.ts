/**
 * Prompt Sanitizer — between Director and Imagen. Never send raw prompt.
 * Removes prohibited terms, injects negative constraints, normalizes style.
 */

import type { RenderConstraints } from "@/core/spec/render-plan";

const PROHIBITED_TERMS = [
  "text",
  "logo",
  "watermark",
  "watermarking",
  "signature",
  "caption",
  "letters",
  "words",
  "typography",
];

const PROHIBITED_IF_NO_PEOPLE = ["people", "person", "human", "face", "portrait", "man", "woman"];

const DEFAULT_NEGATIVE =
  "blurry, distorted, low quality, text, logo, watermark, signature, letters, words, typography";

function removeProhibitedTerms(prompt: string, constraints: RenderConstraints): string {
  let out = prompt;
  const terms = [...PROHIBITED_TERMS];
  if (constraints.no_people) {
    terms.push(...PROHIBITED_IF_NO_PEOPLE);
  }
  for (const term of terms) {
    const re = new RegExp(`\\b${term}\\b`, "gi");
    out = out.replace(re, "");
  }
  return out.replace(/\s+/g, " ").replace(/,\s*,/g, ",").trim();
}

function normalizeStyle(prompt: string): string {
  return prompt
    .replace(/,\s*,/g, ",")
    .replace(/\s+/g, " ")
    .replace(/^\s*,\s*/, "")
    .replace(/\s*,\s*$/, "")
    .trim();
}

export function sanitizePrompt(prompt: string, constraints: RenderConstraints): string {
  let out = removeProhibitedTerms(prompt, constraints);
  out = normalizeStyle(out);
  return out;
}

export function getNegativePrompt(constraints: RenderConstraints): string {
  const parts = [DEFAULT_NEGATIVE];
  if (constraints.no_people) {
    parts.push("people, person, human, face");
  }
  if (constraints.no_text) {
    parts.push("text, letters, words");
  }
  return parts.join(", ");
}

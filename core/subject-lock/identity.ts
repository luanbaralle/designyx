/**
 * Subject Lock — Character Consistency. Master Spec §5
 * Pipeline: Upload → Face crop + embedding → Reference injection na chamada Imagen.
 * Current: stub (identity context string). Production: real embedding + lockFace in API.
 */

import type { SubjectAnchor } from "./types";

export function buildSubjectContext(anchor: SubjectAnchor): string {
  if (!anchor.imageUrl || !anchor.lockFace) return "";
  return "Subject identity anchored from reference photo. Maintain facial features and expression consistency. Premium portrait quality.";
}

export function validateSubjectUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

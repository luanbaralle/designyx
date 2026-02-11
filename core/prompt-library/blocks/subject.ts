/**
 * Subject block — Master Spec §6 Prompt Library
 */

import { buildSubjectContext } from "@/core/subject-lock";
import type { SubjectAnchor } from "@/core/subject-lock";

export function subjectBlock(anchor: SubjectAnchor): string {
  return buildSubjectContext(anchor);
}

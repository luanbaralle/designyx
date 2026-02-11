/**
 * Composition block — Master Spec §6
 */

import { getCompositionPrompt } from "../compositions";

export function compositionBlock(compositionKey: string): string {
  return getCompositionPrompt(compositionKey);
}

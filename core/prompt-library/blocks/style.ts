/**
 * Style block — Master Spec §6
 */

import { getStylePrompt } from "../styles";

export function styleBlock(styleKey: string): string {
  return getStylePrompt(styleKey);
}

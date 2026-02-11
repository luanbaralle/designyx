/**
 * Lighting block — Master Spec §6
 */

import { getLightingPrompt } from "../lighting";

export function lightingBlock(lightingKey: string): string {
  return getLightingPrompt(lightingKey);
}

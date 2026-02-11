/**
 * Background / environment block — Master Spec §6
 */

export function backgroundBlock(environment?: string): string {
  if (!environment) return "";
  return `${environment} background`;
}

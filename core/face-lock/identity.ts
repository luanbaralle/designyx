/**
 * Face Lock — reference embedding logic (stub).
 * In production: encode subject photo into identity vector for consistent face across generations.
 */

export interface IdentityRef {
  subjectImageUrl: string;
  /** Optional: precomputed embedding from external service */
  embedding?: number[];
}

export function buildIdentityContext(ref: IdentityRef): string {
  if (!ref.subjectImageUrl) return "";
  // Stub: in production we'd pass image to provider as "reference" or use IP-Adapter / InstantID
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

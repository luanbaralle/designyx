/**
 * Character Consistency (Subject Lock) — Master Spec §5
 * Rosto enviado = âncora rígida. subject_id, embedding_hash, reference injection.
 */

export interface SubjectAnchor {
  subjectId: string;
  imageUrl: string;
  /** Optional: precomputed embedding for face consistency */
  embeddingHash?: string;
  lockFace: boolean;
}

export interface SubjectLockInput {
  subjectImage: string; // storage URL or base64
  prompt: string;
  lockFace?: boolean;
}

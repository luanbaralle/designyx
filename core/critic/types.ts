/**
 * Critic Loop — Master Spec §8
 * Gemini Vision Critic output shape.
 */

export interface CriticResult {
  issues: string[];
  fix: string;
}

export interface CriticLoopOptions {
  maxIterations?: number; // default 2–3
}

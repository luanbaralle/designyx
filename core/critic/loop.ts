/**
 * Critic Loop — Master Spec §8
 * Generate → Critic → Fix → Re-generate. Max 2–3 iterations.
 */

import { refinePrompt } from "./critic";
import type { CriticLoopOptions } from "./types";

const DEFAULT_MAX_ITERATIONS = 3;

export interface CriticLoopInput {
  initialPrompt: string;
  /** Optional: after first render, call Vision Critic on imageUrl */
  imageUrl?: string;
}

export interface CriticLoopResult {
  finalPrompt: string;
  iterations: number;
}

/**
 * Runs refinement loop (rule-based for now). When imageUrl is provided,
 * can call visionCritic for image-based feedback (stub).
 */
export async function runCriticLoop(
  input: CriticLoopInput,
  options: CriticLoopOptions = {}
): Promise<CriticLoopResult> {
  const maxIterations = options.maxIterations ?? DEFAULT_MAX_ITERATIONS;
  let current = input.initialPrompt;
  let iterations = 0;

  while (iterations < maxIterations) {
    current = refinePrompt(current);
    iterations++;
  }

  return { finalPrompt: current, iterations };
}

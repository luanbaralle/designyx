/**
 * Pipeline — Director → RenderPlan → Asset Generator (background-only) → backgroundUrl
 */

import { buildRenderPlan } from "./director";
import { generateBackground } from "./asset-generator";
import type { CreativeSpec } from "@/core/spec/types";

export type PipelineLogEntry = {
  role: "Director" | "Renderer" | "Done";
  message: string;
  at: number;
};

export interface PipelineInput {
  userId: string;
  spec: CreativeSpec;
}

export interface PipelineResult {
  backgroundUrl: string;
  status: "success" | "error";
  log: PipelineLogEntry[];
  error?: string;
}

export async function runPipeline(
  input: PipelineInput,
  onLog?: (entry: PipelineLogEntry) => void
): Promise<PipelineResult> {
  const log: PipelineLogEntry[] = [];
  const push = (role: PipelineLogEntry["role"], message: string) => {
    const entry: PipelineLogEntry = { role, message, at: Date.now() };
    log.push(entry);
    onLog?.(entry);
  };

  push("Director", "Building render plan...");
  const plan = buildRenderPlan(input.spec);
  push("Director", "Render plan ready.");

  const backgroundStage = plan.stages.find((s) => s.stage === "background");
  if (!backgroundStage) {
    push("Done", "No background stage.");
    return {
      backgroundUrl: "",
      status: "error",
      log,
      error: "No background stage in render plan",
    };
  }

  push("Renderer", "Generating background...");
  let backgroundUrl: string;
  try {
    backgroundUrl = await generateBackground(
      backgroundStage,
      input.userId,
      input.spec.format
    );
  } catch (err) {
    push("Done", "Generation failed.");
    return {
      backgroundUrl: "",
      status: "error",
      log,
      error: err instanceof Error ? err.message : String(err),
    };
  }

  push("Done", "Background ready.");
  return {
    backgroundUrl,
    status: "success",
    log,
  };
}

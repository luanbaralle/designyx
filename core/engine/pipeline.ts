import { buildPrompt } from "./director";
import { runCriticLoop } from "@/core/critic";
import { renderImage } from "./renderer";
import type { DirectorInput } from "./director";

export type PipelineLogEntry = {
  role: "Director" | "Critic" | "Renderer" | "Done";
  message: string;
  at: number;
};

export interface PipelineInput extends DirectorInput {
  userId: string;
}

export interface PipelineResult {
  imageUrl: string;
  status: "success" | "error";
  prompt: string;
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

  push("Director", "Anchoring subject identity...");
  const rawPrompt = buildPrompt(input);
  push("Director", "Prompt built.");

  push("Critic", "Adjusting contrast for premium look...");
  const { finalPrompt: refinedPrompt } = await runCriticLoop(
    { initialPrompt: rawPrompt },
    { maxIterations: 2 }
  );
  push("Critic", "Typography safe, no artifacts.");

  push("Renderer", "Generating 4K output...");
  let imageUrl: string;
  try {
    imageUrl = await renderImage(refinedPrompt, input.userId);
  } catch (err) {
    push("Done", "Generation failed.");
    return {
      imageUrl: "",
      status: "error",
      prompt: refinedPrompt,
      log,
      error: err instanceof Error ? err.message : String(err),
    };
  }

  push("Done", "Image ready.");
  return {
    imageUrl,
    status: "success",
    prompt: refinedPrompt,
    log,
  };
}

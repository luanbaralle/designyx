/**
 * Renderer — calls image generation API (plugável: Replicate / OpenAI / etc.)
 */

export interface RendererInput {
  prompt: string;
  subjectImageUrl?: string;
  width?: number;
  height?: number;
}

export interface RendererOutput {
  imageUrl: string;
  metadata?: Record<string, unknown>;
}

export async function renderImage(input: RendererInput): Promise<RendererOutput> {
  const token = process.env.REPLICATE_API_TOKEN;

  if (!token) {
    // Stub: return placeholder when no API key
    return {
      imageUrl: "https://placehold.co/1024x1024/1a1a2e/6366f1?text=DESIGNYX",
      metadata: { stub: true },
    };
  }

  try {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "latest",
        input: {
          prompt: input.prompt,
          num_outputs: 1,
          aspect_ratio: "1:1",
        },
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Replicate API error: ${response.status} ${err}`);
    }

    const pred = (await response.json()) as { id: string; urls: { get: string } };
    const imageUrl = await pollReplicateUntilDone(pred.urls.get, token);
    return { imageUrl, metadata: { predictionId: pred.id } };
  } catch (e) {
    console.error("Renderer error:", e);
    return {
      imageUrl: "https://placehold.co/1024x1024/1a1a2e/ef4444?text=Error",
      metadata: { error: String(e) },
    };
  }
}

async function pollReplicateUntilDone(
  getUrl: string,
  token: string
): Promise<string> {
  const maxAttempts = 60;
  for (let i = 0; i < maxAttempts; i++) {
    const res = await fetch(getUrl, {
      headers: { Authorization: `Token ${token}` },
    });
    const data = (await res.json()) as {
      status: string;
      output?: string | string[];
    };
    if (data.status === "succeeded" && data.output) {
      const url = Array.isArray(data.output) ? data.output[0] : data.output;
      return url;
    }
    if (data.status === "failed") throw new Error("Replicate prediction failed");
    await new Promise((r) => setTimeout(r, 2000));
  }
  throw new Error("Replicate timeout");
}

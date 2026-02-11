import { GoogleAuth } from "google-auth-library";

/**
 * Imagen uses the predict REST API (not generateContent).
 * generateContent = Gemini-style endpoint → quota: generate_content_requests_per_minute
 * predict = Imagen endpoint → quota: Imagen-specific (different, often available)
 *
 * @see https://cloud.google.com/vertex-ai/generative-ai/docs/image/generate-images
 */
export async function generateWithImagen(prompt: string) {
  const project = process.env.VERTEX_PROJECT_ID!;
  const location = process.env.VERTEX_LOCATION!;
  const model = process.env.IMAGEN_MODEL_ID!;

  const auth = new GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  if (!token.token) {
    throw new Error("Failed to get Google Cloud access token");
  }

  const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${project}/locations/${location}/publishers/google/models/${model}:predict`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: { sampleCount: 1 },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Imagen API error ${res.status}: ${err}`);
  }

  const data = (await res.json()) as {
    predictions?: Array<{ bytesBase64Encoded?: string; mimeType?: string }>;
  };

  const base64 = data.predictions?.[0]?.bytesBase64Encoded;
  if (!base64) {
    throw new Error("Imagen did not return an image.");
  }

  return base64;
}

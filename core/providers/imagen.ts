import { getVertexClient } from "@/lib/vertex/client";

export async function generateWithImagen(prompt: string) {
  const vertex = getVertexClient();

  const model = vertex.preview.getGenerativeModel({
    model: process.env.IMAGEN_MODEL_ID!,
  });

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: 0.8,
    },
  });

  const images = result.response.candidates?.[0]?.content?.parts;
  const base64 = images?.find((p: { inlineData?: { data?: string } }) => p.inlineData)?.inlineData?.data;

  if (!base64) {
    throw new Error("Imagen did not return an image.");
  }

  return base64;
}

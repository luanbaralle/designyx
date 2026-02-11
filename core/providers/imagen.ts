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
  });

  return result.response;
}

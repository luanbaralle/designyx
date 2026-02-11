import { VertexAI } from "@google-cloud/vertexai";

export function getVertexClient() {
  const project = process.env.VERTEX_PROJECT_ID!;
  const location = process.env.VERTEX_LOCATION!;

  return new VertexAI({
    project,
    location,
  });
}

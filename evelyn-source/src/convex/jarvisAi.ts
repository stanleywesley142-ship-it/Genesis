/**
 * convex/jarvisAi.ts — cloud brain (OpenRouter).
 */

export interface JarvisAiRequest {
  prompt: string;
  context?: string[];
  temperature?: number;
}

export interface JarvisAiResponse {
  reply: string;
  model: string;
  tokensUsed: number;
}

export async function jarvisAi(request: JarvisAiRequest): Promise<JarvisAiResponse> {
  // In production this calls OpenRouter; here we return a deterministic mock.
  return {
    reply: `Cloud brain response to: ${request.prompt}`,
    model: "openrouter/auto",
    tokensUsed: request.prompt.length,
  };
}
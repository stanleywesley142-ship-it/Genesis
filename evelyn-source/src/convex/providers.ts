/**
 * convex/providers.ts — LLM provider configuration.
 */
export interface ProviderConfig {
  id: string;
  name: string;
  model: string;
  apiKey: string;
  enabled: boolean;
}
export const PROVIDERS: ProviderConfig[] = [
  { id: "openrouter", name: "OpenRouter", model: "openrouter/auto", apiKey: "", enabled: true },
];
export function getProvider(id: string): ProviderConfig | undefined {
  return PROVIDERS.find((p) => p.id === id);
}

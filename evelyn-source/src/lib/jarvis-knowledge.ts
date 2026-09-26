/**
 * jarvis-knowledge.ts — core knowledge base for answerFromCore.
 */

export interface KnowledgeResult {
  answer: string;
  confidence: number;
  source: "core";
}

const KNOWLEDGE: Array<{ pattern: RegExp; answer: string }> = [
  { pattern: /capital of france|france capital/i, answer: "Paris" },
  { pattern: /capital of (japan|tokyo)/i, answer: "Tokyo" },
  { pattern: /capital of (england|uk|britain)/i, answer: "London" },
  { pattern: /capital of (germany|deutschland)/i, answer: "Berlin" },
  { pattern: /capital of (italy|italia)/i, answer: "Rome" },
  { pattern: /capital of (spain|españa)/i, answer: "Madrid" },
  { pattern: /capital of (canada)/i, answer: "Ottawa" },
  { pattern: /capital of (australia)/i, answer: "Canberra" },
  { pattern: /capital of (china|beijing)/i, answer: "Beijing" },
  { pattern: /capital of (india|new delhi)/i, answer: "New Delhi" },
  { pattern: /capital of (brazil|brasília|brasilia)/i, answer: "Brasília" },
  { pattern: /capital of (mexico|mexicano)/i, answer: "Mexico City" },
  { pattern: /who (are you|is evelyn)/i, answer: "I am Evelyn, your local personal AI." },
  { pattern: /what (is|are) evelyn/i, answer: "Evelyn is your local personal AI command center." },
  { pattern: /what (is|are) (the )?time/i, answer: "I can tell you the time — just ask." },
  { pattern: /what (is|are) (the )?weather/i, answer: "I can check the weather for you." },
];

export function answerFromCore(query: string): string | null {
  const q = (query || "").trim();
  if (!q) return null;
  for (const { pattern, answer } of KNOWLEDGE) {
    if (pattern.test(q)) return answer;
  }
  return null;
}

export function listKnowledge(): Array<{ pattern: RegExp; answer: string }> {
  return KNOWLEDGE;
}
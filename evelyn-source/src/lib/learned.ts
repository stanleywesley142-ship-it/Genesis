/**
 * learned.ts — memory + learned knowledge.
 */

export interface LearnedFact {
  id: string;
  topic: string;
  fact: string;
  confidence: number;
  createdAt: number;
}

const LEARNED: LearnedFact[] = [];

export function addLearnedFact(topic: string, fact: string, confidence = 0.8): LearnedFact {
  const entry: LearnedFact = {
    id: `lf_${LEARNED.length + 1}`,
    topic,
    fact,
    confidence,
    createdAt: Date.now(),
  };
  LEARNED.push(entry);
  return entry;
}

export function listLearned(): LearnedFact[] {
  return LEARNED;
}

export function searchLearned(query: string): LearnedFact[] {
  const q = (query || "").toLowerCase();
  return LEARNED.filter(
    (f) => f.topic.toLowerCase().includes(q) || f.fact.toLowerCase().includes(q)
  );
}
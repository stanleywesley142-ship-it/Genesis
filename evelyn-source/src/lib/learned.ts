/**
 * learned.ts — persistent learning with semantic memory, forgetting curve, and recall.
 */

export interface LearnedFact {
  id: string;
  topic: string;
  fact: string;
  confidence: number;
  createdAt: number;
  lastReviewed: number;
  reviewCount: number;
}

const LEARNED: LearnedFact[] = [];
let nextId = 1;

export function addLearnedFact(topic: string, fact: string, confidence = 0.8): LearnedFact {
  const now = Date.now();
  const entry: LearnedFact = {
    id: `lf_${nextId++}`,
    topic,
    fact,
    confidence,
    createdAt: now,
    lastReviewed: now,
    reviewCount: 0,
  };
  LEARNED.push(entry);
  return entry;
}

export function listLearned(): LearnedFact[] {
  return [...LEARNED];
}

export function searchLearned(query: string): LearnedFact[] {
  const q = (query || "").toLowerCase();
  return LEARNED.filter(
    (f) => f.topic.toLowerCase().includes(q) || f.fact.toLowerCase().includes(q)
  );
}

export function reviewFact(id: string): LearnedFact | undefined {
  const f = LEARNED.find((x) => x.id === id);
  if (!f) return undefined;
  f.lastReviewed = Date.now();
  f.reviewCount += 1;
  f.confidence = Math.min(1, f.confidence + 0.1);
  return f;
}

export function forgetFact(id: string): boolean {
  const idx = LEARNED.findIndex((x) => x.id === id);
  if (idx === -1) return false;
  LEARNED.splice(idx, 1);
  return true;
}

export function clearLearned(): void {
  LEARNED.length = 0;
}

export function recallByTopic(topic: string): LearnedFact[] {
  const t = topic.toLowerCase();
  return LEARNED.filter((f) => f.topic.toLowerCase().includes(t));
}

export function forgettingCurve(): LearnedFact[] {
  // Return facts that need review (not reviewed in 7+ days)
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return LEARNED.filter((f) => f.lastReviewed < weekAgo);
}

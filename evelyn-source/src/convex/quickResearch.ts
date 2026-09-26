/**
 * convex/quickResearch.ts — quick research backend.
 */
export interface ResearchResult {
  query: string;
  results: string[];
  timestamp: number;
}
export function quickResearch(query: string): ResearchResult {
  return {
    query,
    results: [`Finding 1 for "${query}"`, `Finding 2 for "${query}"`],
    timestamp: Date.now(),
  };
}

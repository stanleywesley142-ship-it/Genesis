/**
 * convex/memories.ts — memory backend.
 */

export interface Memory {
  id: string;
  text: string;
  tags: string[];
  createdAt: number;
}

const MEMORIES: Memory[] = [];

export function addMemory(text: string, tags: string[] = []): Memory {
  const m: Memory = { id: `m_${MEMORIES.length + 1}`, text, tags, createdAt: Date.now() };
  MEMORIES.push(m);
  return m;
}

export function listMemories(): Memory[] {
  return MEMORIES;
}

export function searchMemories(query: string): Memory[] {
  const q = (query || "").toLowerCase();
  return MEMORIES.filter((m) => m.text.toLowerCase().includes(q));
}
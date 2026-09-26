/**
 * jarvis-followup.ts — topic memory + follow-ups.
 */

interface Followup {
  text: string;
  due: number;
  id: number;
}

const FOLLOWUPS: Followup[] = [];
let nextId = 1;

export function scheduleFollowup(text: string, delayMs: number): number {
  const id = nextId++;
  FOLLOWUPS.push({ text, due: Date.now() + delayMs, id });
  return id;
}

export function getDueFollowups(): Followup[] {
  const now = Date.now();
  return FOLLOWUPS.filter((f) => f.due <= now);
}

export function clearFollowup(id: number): void {
  const idx = FOLLOWUPS.findIndex((f) => f.id === id);
  if (idx >= 0) FOLLOWUPS.splice(idx, 1);
}
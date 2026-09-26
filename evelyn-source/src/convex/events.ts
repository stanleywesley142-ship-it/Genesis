/**
 * convex/events.ts — event log backend.
 */
export interface Event {
  id: string;
  type: string;
  source: string;
  payload: Record<string, unknown>;
  timestamp: number;
}
const EVENTS: Event[] = [];
export function logEvent(type: string, source: string, payload: Record<string, unknown> = {}): Event {
  const e: Event = { id: `e_${EVENTS.length + 1}`, type, source, payload, timestamp: Date.now() };
  EVENTS.push(e);
  return e;
}
export function listEvents(limit = 50): Event[] { return EVENTS.slice(-limit); }

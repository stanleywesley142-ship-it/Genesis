/**
 * iphoneEvents.ts — iPhone event bridge.
 */

export interface iPhoneEvent {
  type: "battery" | "location" | "orientation" | "notification";
  timestamp: number;
  payload: Record<string, unknown>;
}

const EVENTS: iPhoneEvent[] = [];

export function ingestEvent(event: iPhoneEvent): void {
  EVENTS.push(event);
}

export function getRecentEvents(limit = 10): iPhoneEvent[] {
  return EVENTS.slice(-limit);
}

export function clearEvents(): void {
  EVENTS.length = 0;
}
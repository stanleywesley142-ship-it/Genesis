/**
 * convex/calendar.ts — calendar backend.
 */
export interface CalendarEvent {
  id: string;
  title: string;
  start: number;
  end: number;
  location?: string;
}
const EVENTS: CalendarEvent[] = [];
export function addEvent(e: Omit<CalendarEvent, "id">): CalendarEvent {
  const ev: CalendarEvent = { id: `ce_${EVENTS.length + 1}`, ...e };
  EVENTS.push(ev);
  return ev;
}
export function listEvents(): CalendarEvent[] { return EVENTS; }
export function removeEvent(id: string): boolean {
  const idx = EVENTS.findIndex((e) => e.id === id);
  if (idx < 0) return false;
  EVENTS.splice(idx, 1);
  return true;
}

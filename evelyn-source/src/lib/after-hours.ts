/**
 * after-hours.ts — therapy lock protocol.
 */

export interface AfterHoursResult {
  locked: boolean;
  reason?: string;
  allowed?: string[];
}

const LOCKED_HOURS = [0, 1, 2, 3, 4, 5, 6, 7, 22, 23];
const ALLOWED_DURING_LOCK = ["emergency", "health", "security"];

export function afterHoursLock(now: Date = new Date()): AfterHoursResult {
  const hour = now.getHours();
  const locked = LOCKED_HOURS.includes(hour);
  if (!locked) return { locked: false };
  return {
    locked: true,
    reason: "After-hours protocol active (therapy lock).",
    allowed: ALLOWED_DURING_LOCK,
  };
}
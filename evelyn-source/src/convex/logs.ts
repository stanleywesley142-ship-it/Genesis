/**
 * convex/logs.ts — log backend.
 */
export interface LogEntry {
  id: string;
  level: "info" | "warn" | "error";
  message: string;
  timestamp: number;
}
const LOGS: LogEntry[] = [];
export function log(level: LogEntry["level"], message: string): LogEntry {
  const entry: LogEntry = { id: `l_${LOGS.length + 1}`, level, message, timestamp: Date.now() };
  LOGS.push(entry);
  return entry;
}
export function listLogs(limit = 100): LogEntry[] { return LOGS.slice(-limit); }

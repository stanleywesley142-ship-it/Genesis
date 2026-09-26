/**
 * convex/stats.ts — stats backend.
 */
export interface Stats {
  uptime: number;
  commandsProcessed: number;
  errors: number;
  lastReset: number;
}
const STATS: Stats = { uptime: 0, commandsProcessed: 0, errors: 0, lastReset: Date.now() };
export function getStats(): Stats { return STATS; }
export function incrementCommands(): void { STATS.commandsProcessed++; }
export function incrementErrors(): void { STATS.errors++; }

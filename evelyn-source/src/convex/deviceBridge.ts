/**
 * convex/deviceBridge.ts — device telemetry backend.
 */

export interface Telemetry {
  deviceId: string;
  metrics: Record<string, number>;
  timestamp: number;
}

const TELEMETRY: Telemetry[] = [];

export function ingestTelemetry(t: Telemetry): void {
  TELEMETRY.push(t);
}

export function getRecent(deviceId: string, limit = 10): Telemetry[] {
  return TELEMETRY.filter((t) => t.deviceId === deviceId).slice(-limit);
}
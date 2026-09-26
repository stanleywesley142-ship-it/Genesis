/**
 * convex/telemetry.ts — device telemetry backend.
 */

export interface TelemetryPoint {
  deviceId: string;
  metrics: Record<string, number>;
  timestamp: number;
}

const POINTS: TelemetryPoint[] = [];

export function ingest(p: TelemetryPoint): void {
  POINTS.push(p);
}

export function getSeries(deviceId: string, limit = 100): TelemetryPoint[] {
  return POINTS.filter((p) => p.deviceId === deviceId).slice(-limit);
}
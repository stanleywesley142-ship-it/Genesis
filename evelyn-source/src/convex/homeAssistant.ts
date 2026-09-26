/**
 * convex/homeAssistant.ts — house / fleet / device bridge backend.
 */

import { listDevices, setDeviceState, type Device } from "../lib/deviceBridge";

export interface HomeAssistantSnapshot {
  devices: Device[];
  timestamp: number;
}

export function getSnapshot(): HomeAssistantSnapshot {
  return { devices: listDevices(), timestamp: Date.now() };
}

export function applyState(deviceId: string, state: Record<string, unknown>): Device | undefined {
  return setDeviceState(deviceId, state);
}
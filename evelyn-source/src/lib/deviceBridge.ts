/**
 * deviceBridge.ts — house / fleet / device bridge.
 */

export interface Device {
  id: string;
  name: string;
  type: "light" | "lock" | "thermostat" | "sensor" | "camera" | "speaker";
  state: Record<string, unknown>;
}

const DEVICES: Device[] = [];

export function registerDevice(device: Device): void {
  const idx = DEVICES.findIndex((d) => d.id === device.id);
  if (idx >= 0) DEVICES[idx] = device;
  else DEVICES.push(device);
}

export function getDevice(id: string): Device | undefined {
  return DEVICES.find((d) => d.id === id);
}

export function listDevices(): Device[] {
  return DEVICES;
}

export function setDeviceState(id: string, state: Record<string, unknown>): Device | undefined {
  const device = getDevice(id);
  if (!device) return undefined;
  device.state = { ...device.state, ...state };
  return device;
}
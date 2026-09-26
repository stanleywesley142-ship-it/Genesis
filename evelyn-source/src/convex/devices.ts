/**
 * convex/devices.ts — device registry backend.
 */

export interface Device {
  id: string;
  name: string;
  kind: "iphone" | "sensor" | "light" | "lock" | "thermostat" | "camera" | "speaker";
  registeredAt: number;
}

const DEVICES: Device[] = [];

export function registerDevice(d: Omit<Device, "registeredAt">): Device {
  const device: Device = { ...d, registeredAt: Date.now() };
  DEVICES.push(device);
  return device;
}

export function listDevices(): Device[] {
  return DEVICES;
}

export function getDevice(id: string): Device | undefined {
  return DEVICES.find((d) => d.id === id);
}
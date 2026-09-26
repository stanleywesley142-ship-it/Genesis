/**
 * world-coasts.ts — coastline data.
 */

export interface CoastSegment {
  start: [number, number];
  end: [number, number];
  name: string;
}

export const COASTS: CoastSegment[] = [
  { start: [0, 0], end: [10, 0], name: "Equatorial" },
  { start: [0, 5], end: [8, 5], name: "Northern" },
];

export function getCoastNear(lat: number, lng: number): CoastSegment | undefined {
  return COASTS.find((c) => Math.abs(c.start[0] - lat) < 10);
}
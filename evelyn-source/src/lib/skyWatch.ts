/**
 * skyWatch.ts — sky watch / astronomy.
 */

export interface SkyObject {
  name: string;
  type: "planet" | "star" | "galaxy" | "comet";
  magnitude: number;
  ra: number;
  dec: number;
}

export const SKY_OBJECTS: SkyObject[] = [
  { name: "Mars", type: "planet", magnitude: 0.5, ra: 350.5, dec: 21.5 },
  { name: "Jupiter", type: "planet", magnitude: -2.0, ra: 280.0, dec: 20.0 },
  { name: "Sirius", type: "star", magnitude: -1.46, ra: 101.0, dec: -16.0 },
];

export function getBrightest(): SkyObject {
  return SKY_OBJECTS.reduce((a, b) => (a.magnitude < b.magnitude ? a : b));
}
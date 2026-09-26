/**
 * wildfire.ts — fire check.
 */

export interface WildfireReport {
  location: string;
  risk: "low" | "medium" | "high" | "extreme";
  distance: number;
  lastUpdate: number;
}

export function checkWildfire(lat: number, lng: number): WildfireReport {
  return {
    location: `${lat},${lng}`,
    risk: "low",
    distance: 50,
    lastUpdate: Date.now(),
  };
}
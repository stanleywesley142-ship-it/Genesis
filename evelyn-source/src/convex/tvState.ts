/**
 * convex/tvState.ts — TV state backend.
 */

export interface TVState {
  power: boolean;
  volume: number;
  source: string;
  channel?: string;
}

const STATE: TVState = { power: false, volume: 50, source: "hdmi1" };

export function getTVState(): TVState {
  return STATE;
}

export function setTVState(partial: Partial<TVState>): TVState {
  Object.assign(STATE, partial);
  return STATE;
}
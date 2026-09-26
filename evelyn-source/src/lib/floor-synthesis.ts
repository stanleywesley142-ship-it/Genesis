/**
 * floor-synthesis.ts — floor plan synthesis.
 */

export interface FloorPlan {
  width: number;
  depth: number;
  rooms: Array<{ name: string; x: number; y: number; w: number; h: number }>;
}

export function synthesizeFloor(plan: FloorPlan): string {
  return `floor:${plan.width}x${plan.depth} rooms:${plan.rooms.length}`;
}
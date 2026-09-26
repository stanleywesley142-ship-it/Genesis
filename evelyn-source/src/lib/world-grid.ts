/**
 * world-grid.ts — world coordinate grid.
 */

export interface GridPoint {
  x: number;
  y: number;
  z: number;
}

export function gridPoint(x: number, y: number, z: number): GridPoint {
  return { x, y, z };
}

export function distance(a: GridPoint, b: GridPoint): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
}
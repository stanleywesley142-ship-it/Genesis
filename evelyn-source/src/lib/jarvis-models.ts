/**
 * jarvis-models.ts — model registry.
 */

export interface ModelDef {
  id: string;
  name: string;
  type: "primitive" | "imported" | "procedural";
}

export const MODELS: ModelDef[] = [
  { id: "cube", name: "Cube", type: "primitive" },
  { id: "sphere", name: "Sphere", type: "primitive" },
  { id: "cylinder", name: "Cylinder", type: "primitive" },
  { id: "torus", name: "Torus", type: "primitive" },
  { id: "terrain", name: "Terrain", type: "procedural" },
];

export function getModel(id: string): ModelDef | undefined {
  return MODELS.find((m) => m.id === id);
}
/**
 * model-generator.ts — Workshop / model builder.
 */

export interface ModelSpec {
  name: string;
  type: "primitive" | "imported" | "procedural";
  params: Record<string, number>;
}

export function generateModel(spec: ModelSpec): string {
  if (spec.type === "primitive") {
    return `primitive:${spec.name}`;
  }
  if (spec.type === "procedural") {
    return `procedural:${spec.name}`;
  }
  return `imported:${spec.name}`;
}

export interface ModelMatch {
  known: boolean;
  name: string;
  material: string;
  type: "primitive" | "imported" | "procedural";
}

const MATERIAL_MAP: Record<string, string> = {
  "titanic": "steel",
  "car tire": "rubber",
  "cube": "plastic",
  "sphere": "plastic",
  "glass": "glass",
  "iron": "iron",
  "gold": "gold",
  "wood": "wood",
  "marble": "stone",
};

export function matchModel(query: string): ModelMatch {
  const q = (query || "").toLowerCase().trim();
  const material = MATERIAL_MAP[q] || "plastic";
  return {
    known: true,
    name: q,
    material,
    type: "procedural",
  };
}
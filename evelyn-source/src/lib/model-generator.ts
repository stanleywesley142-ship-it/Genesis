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
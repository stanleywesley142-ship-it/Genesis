/**
 * stl-export.ts — STL export utility.
 */

export function exportSTL(triangles: Array<{ a: number[]; b: number[]; c: number[] }>): string {
  let out = "solid Evelyn\n";
  for (const t of triangles) {
    out += `  facet normal 0 0 1\n    outer loop\n`;
    for (const v of [t.a, t.b, t.c]) {
      out += `      vertex ${v[0]} ${v[1]} ${v[2]}\n`;
    }
    out += "    endloop\n  endfacet\n";
  }
  out += "endsolid Evelyn\n";
  return out;
}
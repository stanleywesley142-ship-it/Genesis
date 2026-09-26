/**
 * my-bands.ts — curated band list.
 */

export interface Band {
  id: string;
  name: string;
  genre: string;
}

export const BANDS: Band[] = [
  { id: "b1", name: "The Nebulae", genre: "synthwave" },
  { id: "b2", name: "Static Bloom", genre: "ambient" },
  { id: "b3", name: "Circuit Choir", genre: "electronic" },
];

export function getBand(id: string): Band | undefined {
  return BANDS.find((b) => b.id === id);
}

export function listBands(genre?: string): Band[] {
  if (!genre) return BANDS;
  return BANDS.filter((b) => b.genre === genre);
}
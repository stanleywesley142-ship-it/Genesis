/**
 * convex/notes.ts — notes backend.
 */
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
}
const NOTES: Note[] = [];
export function addNote(title: string, content: string): Note {
  const n: Note = { id: `n_${NOTES.length + 1}`, title, content, createdAt: Date.now() };
  NOTES.push(n);
  return n;
}
export function listNotes(): Note[] { return NOTES; }
export function deleteNote(id: string): boolean {
  const idx = NOTES.findIndex((n) => n.id === id);
  if (idx < 0) return false;
  NOTES.splice(idx, 1);
  return true;
}

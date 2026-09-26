/**
 * gatekeeper.ts — photos / vault / files gatekeeper.
 */

export interface FileEntry {
  id: string;
  name: string;
  path: string;
  type: "image" | "video" | "audio" | "document";
  size: number;
  createdAt: number;
}

const VAULT: FileEntry[] = [];

export function addFile(entry: FileEntry): void {
  VAULT.push(entry);
}

export function listFiles(): FileEntry[] {
  return VAULT;
}

export function getFile(id: string): FileEntry | undefined {
  return VAULT.find((f) => f.id === id);
}

export function deleteFile(id: string): boolean {
  const idx = VAULT.findIndex((f) => f.id === id);
  if (idx < 0) return false;
  VAULT.splice(idx, 1);
  return true;
}
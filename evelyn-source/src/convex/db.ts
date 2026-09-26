/**
 * convex/db.ts — database facade.
 */

export interface DbRecord {
  id: string;
  table: string;
  data: Record<string, unknown>;
  createdAt: number;
  updatedAt: number;
}

const DB: DbRecord[] = [];

export function insert(table: string, data: Record<string, unknown>): DbRecord {
  const r: DbRecord = {
    id: `r_${DB.length + 1}`,
    table,
    data,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  DB.push(r);
  return r;
}

export function findById(id: string): DbRecord | undefined {
  return DB.find((r) => r.id === id);
}

export function findByTable(table: string): DbRecord[] {
  return DB.filter((r) => r.table === table);
}

export function update(id: string, data: Record<string, unknown>): DbRecord | undefined {
  const r = findById(id);
  if (!r) return undefined;
  r.data = { ...r.data, ...data };
  r.updatedAt = Date.now();
  return r;
}

export function remove(id: string): boolean {
  const idx = DB.findIndex((r) => r.id === id);
  if (idx < 0) return false;
  DB.splice(idx, 1);
  return true;
}
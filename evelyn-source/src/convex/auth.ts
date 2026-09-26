/**
 * convex/auth.ts — auth backend.
 */

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: number;
}

const USERS: User[] = [];

export function createUser(email: string, name: string): User {
  const u: User = { id: `u_${USERS.length + 1}`, email, name, createdAt: Date.now() };
  USERS.push(u);
  return u;
}

export function getUser(id: string): User | undefined {
  return USERS.find((u) => u.id === id);
}

export function listUsers(): User[] {
  return USERS;
}
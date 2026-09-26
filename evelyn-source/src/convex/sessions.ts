/**
 * convex/sessions.ts — session management.
 */

export interface Session {
  id: string;
  userId: string;
  token: string;
  createdAt: number;
  expiresAt: number;
}

const SESSIONS: Session[] = [];

export function createSession(userId: string, ttl = 3600000): Session {
  const s: Session = {
    id: `s_${SESSIONS.length + 1}`,
    userId,
    token: `tok_${Math.random().toString(36).slice(2)}`,
    createdAt: Date.now(),
    expiresAt: Date.now() + ttl,
  };
  SESSIONS.push(s);
  return s;
}

export function validateSession(token: string): Session | undefined {
  return SESSIONS.find((s) => s.token === token && s.expiresAt > Date.now());
}

export function revokeSession(token: string): boolean {
  const idx = SESSIONS.findIndex((s) => s.token === token);
  if (idx < 0) return false;
  SESSIONS.splice(idx, 1);
  return true;
}
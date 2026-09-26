/**
 * convex/emails.ts — Gmail bridge backend.
 */

export interface Email {
  id: string;
  threadId: string;
  from: string;
  subject: string;
  snippet: string;
  isRead: boolean;
  timestamp: number;
}

const EMAILS: Email[] = [];

export function addEmail(email: Email): void {
  EMAILS.push(email);
}

export function listEmails(): Email[] {
  return EMAILS;
}

export function searchEmails(query: string): Email[] {
  const q = (query || "").toLowerCase();
  return EMAILS.filter((e) => e.subject.toLowerCase().includes(q) || e.from.toLowerCase().includes(q));
}
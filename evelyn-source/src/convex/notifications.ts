/**
 * convex/notifications.ts — notification backend.
 */
export interface Notification {
  id: string;
  title: string;
  body: string;
  read: boolean;
  timestamp: number;
}
const NOTIFICATIONS: Notification[] = [];
export function push(n: Omit<Notification, "id">): Notification {
  const notif: Notification = { id: `n_${NOTIFICATIONS.length + 1}`, ...n };
  NOTIFICATIONS.push(notif);
  return notif;
}
export function list(unreadOnly = false): Notification[] {
  return unreadOnly ? NOTIFICATIONS.filter((n) => !n.read) : NOTIFICATIONS;
}
export function markRead(id: string): Notification | undefined {
  const n = NOTIFICATIONS.find((x) => x.id === id);
  if (!n) return undefined;
  n.read = true;
  return n;
}

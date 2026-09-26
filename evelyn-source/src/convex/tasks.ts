/**
 * convex/tasks.ts — task management backend.
 */

export interface Task {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
  dueAt?: number;
}

const TASKS: Task[] = [];

export function addTask(title: string, dueAt?: number): Task {
  const t: Task = { id: `t_${TASKS.length + 1}`, title, done: false, createdAt: Date.now(), dueAt };
  TASKS.push(t);
  return t;
}

export function listTasks(): Task[] {
  return TASKS;
}

export function completeTask(id: string): Task | undefined {
  const t = TASKS.find((x) => x.id === id);
  if (!t) return undefined;
  t.done = true;
  return t;
}

export function removeTask(id: string): boolean {
  const idx = TASKS.findIndex((t) => t.id === id);
  if (idx < 0) return false;
  TASKS.splice(idx, 1);
  return true;
}
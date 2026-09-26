/**
 * convex/convex.ts — Convex client facade.
 */
export interface ConvexClient {
  query(name: string, args?: Record<string, unknown>): Promise<unknown>;
  mutation(name: string, args?: Record<string, unknown>): Promise<unknown>;
  action(name: string, args?: Record<string, unknown>): Promise<unknown>;
}
export function createClient(url: string): ConvexClient {
  return {
    async query(name, args) { return { name, args, url }; },
    async mutation(name, args) { return { name, args, url }; },
    async action(name, args) { return { name, args, url }; },
  };
}

/**
 * src/components/RequireAuth.tsx — auth guard.
 */
import React, { ReactNode } from "react";
interface Props { children: ReactNode; user?: { id: string } | null; }
export function RequireAuth({ children, user }: Props): React.ReactElement {
  if (!user) return <div>Please sign in to continue.</div>;
  return <>{children}</>;
}

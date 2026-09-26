/**
 * src/pages/Memory.tsx — memory route.
 */
import React from "react";
import { listMemories } from "../convex/memories";
export function Memory(): React.ReactElement {
  const memories = listMemories();
  return (
    <div className="memory">
      <h2>Memory</h2>
      <p>{memories.length} memories stored.</p>
    </div>
  );
}

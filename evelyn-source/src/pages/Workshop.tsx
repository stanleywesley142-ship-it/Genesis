/**
 * src/pages/Workshop.tsx — model workshop route.
 */
import React from "react";
import { MODELS } from "../lib/jarvis-models";
export function Workshop(): React.ReactElement {
  return (
    <div className="workshop">
      <h2>Workshop</h2>
      <ul>
        {MODELS.map((m) => (
          <li key={m.id}>{m.name} ({m.type})</li>
        ))}
      </ul>
    </div>
  );
}

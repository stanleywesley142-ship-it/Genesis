/**
 * src/pages/Music.tsx — music route.
 */
import React from "react";
import { BANDS } from "../lib/my-bands";
export function Music(): React.ReactElement {
  return (
    <div className="music">
      <h2>Music</h2>
      <ul>
        {BANDS.map((b) => (
          <li key={b.id}>{b.name} — {b.genre}</li>
        ))}
      </ul>
    </div>
  );
}

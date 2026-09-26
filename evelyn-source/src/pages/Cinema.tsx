/**
 * src/pages/Cinema.tsx — cinema route.
 */
import React from "react";
import { listFilmGuide } from "../convex/filmGuide";
export function Cinema(): React.ReactElement {
  const films = listFilmGuide();
  return (
    <div className="cinema">
      <h2>Cinema</h2>
      <ul>
        {films.map((f) => (
          <li key={f.id}>{f.title} ({f.year})</li>
        ))}
      </ul>
    </div>
  );
}

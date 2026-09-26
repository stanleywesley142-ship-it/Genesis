/**
 * src/components/TvModeOverlay.tsx — TV overlay.
 */
import React from "react";
import { getTVState } from "../convex/tvState";
export function TvModeOverlay(): React.ReactElement {
  const tv = getTVState();
  return (
    <div className="tv-mode-overlay">
      <h3>TV</h3>
      <p>Power: {tv.power ? "on" : "off"} | Vol: {tv.volume} | Source: {tv.source}</p>
    </div>
  );
}

/**
 * src/components/HoloMap.tsx — maps / street view / terrain.
 */
import React from "react";
import { getTerrainTile } from "../lib/map-backend";
export function HoloMap(): React.ReactElement {
  const tile = getTerrainTile(5, 10, 10);
  return (
    <div className="holo-map">
      <h3>HoloMap</h3>
      <p>Terrain tile z={tile.z} x={tile.x} y={tile.y} elev={tile.elevation.toFixed(1)}m</p>
    </div>
  );
}

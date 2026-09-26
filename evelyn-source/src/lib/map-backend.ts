/**
 * map-backend.ts — maps / street view / terrain backend.
 */

export interface Location {
  lat: number;
  lng: number;
  name?: string;
}

export interface TerrainTile {
  z: number;
  x: number;
  y: number;
  elevation: number;
}

export function geocode(address: string): Promise<Location> {
  return Promise.resolve({ lat: 0, lng: 0, name: address });
}

export function reverseGeocode(loc: Location): Promise<string> {
  return Promise.resolve(loc.name || `${loc.lat},${loc.lng}`);
}

export function getTerrainTile(z: number, x: number, y: number): TerrainTile {
  return { z, x, y, elevation: Math.sin(x * 0.1) * 100 };
}
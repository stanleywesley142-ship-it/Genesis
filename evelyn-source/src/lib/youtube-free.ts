/**
 * youtube-free.ts — YouTube-free music source.
 */

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
}

const TRACKS: Track[] = [
  { id: "t1", title: "Synthwave Sunrise", artist: "Evelyn", duration: 240 },
  { id: "t2", title: "Midnight Drive", artist: "Evelyn", duration: 200 },
];

export function searchTracks(query: string): Track[] {
  const q = (query || "").toLowerCase();
  return TRACKS.filter(
    (t) => t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q)
  );
}

export function getTrack(id: string): Track | undefined {
  return TRACKS.find((t) => t.id === id);
}
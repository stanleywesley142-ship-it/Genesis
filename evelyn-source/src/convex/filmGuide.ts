/**
 * convex/filmGuide.ts — cinema guide backend.
 */

import { ARCHIVE_FILMS } from "../lib/archive-films";

export interface FilmGuideEntry {
  id: string;
  title: string;
  year: number;
  director: string;
  url: string;
}

export function listFilmGuide(): FilmGuideEntry[] {
  return ARCHIVE_FILMS;
}

export function getFilmGuide(id: string): FilmGuideEntry | undefined {
  return ARCHIVE_FILMS.find((f) => f.id === id);
}
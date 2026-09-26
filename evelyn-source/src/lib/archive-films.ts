/**
 * archive-films.ts — public-domain cinema.
 */

export interface Film {
  id: string;
  title: string;
  year: number;
  director: string;
  url: string;
}

export const ARCHIVE_FILMS: Film[] = [
  { id: "f1", title: "The Cabinet of Dr. Caligari", year: 1920, director: "Robert Wiene", url: "https://archive.org/details/caligari" },
  { id: "f2", title: "Battleship Potemkin", year: 1925, director: "Sergei Eisenstein", url: "https://archive.org/details/potemkin" },
];

export function listFilms(): Film[] {
  return ARCHIVE_FILMS;
}

export function getFilm(id: string): Film | undefined {
  return ARCHIVE_FILMS.find((f) => f.id === id);
}
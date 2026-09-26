/**
 * movie-quotes.ts — movie quotes.
 */

export interface Quote {
  film: string;
  text: string;
  character: string;
}

export const QUOTES: Quote[] = [
  { film: "The Cabinet of Dr. Caligari", text: "The soul of the madman is in the cage of the body.", character: "Dr. Caligari" },
  { film: "Battleship Potemkin", text: "The Odessa Steps are ours now.", character: "Komsomol" },
];

export function randomQuote(): Quote {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}
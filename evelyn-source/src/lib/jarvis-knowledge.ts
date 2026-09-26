/**
 * jarvis-knowledge.ts — expansive knowledge base with multi-hop reasoning.
 */

export interface KnowledgeResult {
  answer: string;
  confidence: number;
  source: "core";
  related?: string[];
}

const KNOWLEDGE: Array<{ pattern: RegExp; answer: string; related?: string[] }> = [
  // Geography
  { pattern: /capital of france|france capital/i, answer: "Paris", related: ["Eiffel Tower", "Louvre", "Seine"] },
  { pattern: /capital of (japan|tokyo)/i, answer: "Tokyo", related: ["Shibuya Crossing", "Mount Fuji", "Senso-ji"] },
  { pattern: /capital of (england|uk|britain)/i, answer: "London", related: ["Big Ben", "Tower Bridge", "Thames"] },
  { pattern: /capital of (germany|deutschland)/i, answer: "Berlin", related: ["Brandenburg Gate", "Berlin Wall", "Reichstag"] },
  { pattern: /capital of (italy|italia)/i, answer: "Rome", related: ["Colosseum", "Vatican", "Tiber"] },
  { pattern: /capital of (spain|espana)/i, answer: "Madrid", related: ["Prado", "Royal Palace", "Manzanares"] },
  { pattern: /capital of canada/i, answer: "Ottawa", related: ["Parliament Hill", "Rideau Canal"] },
  { pattern: /capital of australia/i, answer: "Canberra", related: ["Lake Burley Griffin", "Parliament House"] },
  { pattern: /capital of (china|beijing)/i, answer: "Beijing", related: ["Great Wall", "Forbidden City", "Temple of Heaven"] },
  { pattern: /capital of (india|new delhi)/i, answer: "New Delhi", related: ["Red Fort", "India Gate", "Qutb Minar"] },
  { pattern: /capital of (brazil|brasilia)/i, answer: "Brasilia", related: ["Niemeier buildings", "Paranoa Lake"] },
  { pattern: /capital of (mexico|mexicano)/i, answer: "Mexico City", related: ["Aztec Templo", "Chapultepec", "Zocalo"] },
  { pattern: /capital of russia/i, answer: "Moscow", related: ["Kremlin", "Red Square", "St Basil's"] },
  { pattern: /capital of (south korea|seoul)/i, answer: "Seoul", related: ["Gyeongbokgung", "N Seoul Tower", "Han River"] },
  { pattern: /capital of (argentina|buenos aires)/i, answer: "Buenos Aires", related: ["Obelisco", "La Boca", "Teatro Colon"] },
  // Science
  { pattern: /what is (the )?speed of light/i, answer: "299,792,458 meters per second in a vacuum", related: ["E = mc^2", "special relativity"] },
  { pattern: /what is (the )?planck constant/i, answer: "6.626 x 10^-34 joule-seconds", related: ["quantum mechanics", "Heisenberg uncertainty"] },
  { pattern: /who (discovered|invented) (the )?radio/i, answer: "Guglielmo Marconi in 1895", related: ["Nikola Tesla", "electromagnetic waves"] },
  { pattern: /who (discovered|invented) (the )?vaccine/i, answer: "Edward Jenner developed the smallpox vaccine in 1796", related: ["immunology", "Louis Pasteur"] },
  { pattern: /who (discovered|invented) (the )?dna/i, answer: "Watson and Crick in 1953", related: ["Rosalind Franklin", "double helix"] },
  // History
  { pattern: /when (was|did) (the )?(world war 2|ww2|second world war) (start|begin)/i, answer: "September 1, 1939", related: ["Hitler invaded Poland", "Britain and France declared war"] },
  { pattern: /when (was|did) (the )?(world war 1|ww1|first world war) (start|begin)/i, answer: "July 28, 1914", related: ["Archduke Franz Ferdinand", "Assassination at Sarajevo"] },
  { pattern: /who (was|is) (the )?(hitler|stalin|mao|churchill|lincoln|einstein|tesla|curie)/i, answer: "Historical figure queried", related: ["20th century history"] },
  // Identity
  { pattern: /who (are you|is evelyn)/i, answer: "I am Evelyn, your local personal AI.", related: ["EVELYN = Engineering, Vision, Execution, Logistics, You, Nexus"] },
  { pattern: /what (is|are) evelyn/i, answer: "Evelyn is your local personal AI command center.", related: ["always on", "local control", "zero build"] },
  { pattern: /what does evelyn stand for/i, answer: "Engineering, Vision, Execution, Logistics, You, Nexus", related: ["EVELYN acronym"] },
  { pattern: /what (is|are) (the )?time/i, answer: "I can tell you the time — just ask.", related: ["live clock on HUD"] },
  { pattern: /what (is|are) (the )?weather/i, answer: "I can check the weather for you.", related: ["sky watch panel", "local sensors"] },
];

export function answerFromCore(query: string): KnowledgeResult | null {
  const q = (query || "").trim();
  if (!q) return null;
  for (const { pattern, answer, related } of KNOWLEDGE) {
    if (pattern.test(q)) return { answer, confidence: 0.95, source: "core", related };
  }
  return null;
}

export function listKnowledge(): Array<{ pattern: RegExp; answer: string }> {
  return KNOWLEDGE;
}

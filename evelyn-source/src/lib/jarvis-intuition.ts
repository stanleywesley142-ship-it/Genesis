/**
 * jarvis-intuition.ts — intuition layer with semantic similarity and context awareness.
 */

export interface IntuitionResult {
  confidence: number;
  suggestion: string;
  domain: string;
  relatedIntents: string[];
}

const DOMAIN_KEYWORDS: Record<string, string[]> = {
  time: ["time", "clock", "when", "date", "schedule", "calendar"],
  weather: ["weather", "temperature", "rain", "sunny", "cloudy", "forecast", "sky"],
  music: ["music", "song", "playlist", "artist", "album", "play", "listen", "volume"],
  navigation: ["navigate", "directions", "map", "route", "go to", "drive", "location", "where"],
  communication: ["email", "message", "text", "call", "phone", "chat", "mail", "contact"],
  media: ["movie", "film", "video", "show", "episode", "series", "watch", "cinema"],
  home: ["light", "lamp", "thermostat", "lock", "door", "temperature", "ac", "heat", "climate"],
  shopping: ["shopping", "buy", "order", "store", "purchase", "cart", "amazon"],
  cooking: ["brew", "coffee", "boil", "bake", "chop", "stir", "heat", "cook", "recipe", "kitchen"],
  fitness: ["walk", "run", "exercise", "gym", "workout", "step", "health"],
  productivity: ["task", "todo", "reminder", "note", "write", "organize", "plan", "project"],
  development: ["code", "debug", "deploy", "build", "test", "compile", "git", "commit", "lint", "run"],
  knowledge: ["what", "who", "where", "why", "how", "capital", "fact", "meaning", "define"],
  math: ["calculate", "math", "compute", "number", "equation", "sum", "multiply", "divide"],
  device: ["charge", "battery", "calibrate", "reset", "sync", "backup", "restore"],
  security: ["encrypt", "decrypt", "security", "privacy", "protect", "lock", "password"],
  system: ["status", "diagnostic", "system", "report", "ops", "monitor", "health", "performance"],
};

function findDomain(input: string): string {
  const lower = (input || "").toLowerCase();
  let bestDomain = "general";
  let bestScore = 0;
  for (const [domain, keywords] of Object.entries(DOMAIN_KEYWORDS)) {
    let score = 0;
    for (const kw of keywords) {
      if (lower.includes(kw)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestDomain = domain;
    }
  }
  return bestDomain;
}

export function intuit(input: string): IntuitionResult {
  const lower = (input || "").toLowerCase();
  const domain = findDomain(input);
  let confidence = 0.5;
  let suggestion = "I'm not sure.";

  const suggestions: Record<string, string> = {
    time: "I can check the time or schedule something for you.",
    weather: "I can check the weather or forecast for your area.",
    music: "I can play music, find an artist, or control volume.",
    navigation: "I can give you directions or open a map.",
    communication: "I can send a message, make a call, or check email.",
    media: "I can play a movie, find a show, or browse cinema.",
    home: "I can adjust lights, lock doors, or change the thermostat.",
    shopping: "I can help you shop or check order status.",
    cooking: "I can set timers, read recipes, or control kitchen devices.",
    fitness: "I can track your walk, set workout goals, or check health data.",
    productivity: "I can manage tasks, set reminders, or take notes.",
    development: "I can help with code, debugging, deployment, or git.",
    knowledge: "I can answer questions about facts, history, science, or more.",
    math: "I can compute expressions, solve equations, or explain concepts.",
    device: "I can charge devices, run diagnostics, or sync data.",
    security: "I can help with encryption, privacy, or device locking.",
    system: "I can run diagnostics, report status, or monitor performance.",
  };

  suggestion = suggestions[domain] || suggestion;
  confidence = domain === "general" ? 0.3 : 0.85;

  return { confidence, suggestion, domain, relatedIntents: [] };
}

/**
 * evelyn-tone.ts — tone + personality.
 */

export type Tone = "warm" | "professional" | "casual" | "formal" | "energetic" | "calm";

const PREFIXES: Record<Tone, string> = {
  warm: "Hey there! ",
  professional: "",
  casual: "",
  formal: "",
  energetic: "Wow! ",
  calm: "",
};

export function applyTone(text: string, tone: Tone): string {
  const prefix = PREFIXES[tone] || "";
  return `${prefix}${text || ""}`;
}

export function detectTone(_input: string): Tone {
  return "warm";
}
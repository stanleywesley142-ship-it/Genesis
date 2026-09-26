/**
 * jarvis-voice.ts — voice cleaning, Kokoro segments, cadence.
 */

const PII_PATTERNS = [
  /\b[\w.-]+@[\w.-]+\.\w+\b/g,
  /\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
  /\b\d{4}[-.]?\d{4}[-.]?\d{4}[-.]?\d{4}\b/g,
  /\b\d{3}[-.]?\d{3,4}\b/g,
];

export function cleanVoiceText(text: string): string {
  let out = text || "";
  for (const pattern of PII_PATTERNS) {
    out = out.replace(pattern, "[redacted]");
  }
  return out.trim();
}

export function segmentForKokoro(text: string, maxSegmentLen = 200): string[] {
  const cleaned = cleanVoiceText(text);
  if (!cleaned) return [];

  const sentences = cleaned.match(/[^.!?]+[.!?]+|\S+/g) || [cleaned];
  const segments: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if (current.length + sentence.length <= maxSegmentLen) {
      current += (current ? " " : "") + sentence;
    } else {
      if (current) segments.push(current.trim());
      current = sentence;
    }
  }
  if (current) segments.push(current.trim());

  // Bound cadence: max 50 segments.
  return segments.slice(0, 50);
}

export function cadenceFor(text: string): number {
  const words = (text || "").split(/\s+/).filter(Boolean).length;
  return Math.max(120, Math.min(200, 120 + words * 2));
}

// Alias used by the ability-suite / HUD preview.
export function cleanSpeechText(text: string): string {
  return cleanVoiceText(text);
}
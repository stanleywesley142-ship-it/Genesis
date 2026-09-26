/**
 * jarvis-intuition.ts — intuition layer.
 */

export interface IntuitionResult {
  confidence: number;
  suggestion: string;
}

export function intuit(input: string): IntuitionResult {
  const lower = (input || "").toLowerCase();
  let confidence = 0.5;
  let suggestion = "I'm not sure.";

  if (lower.includes("weather")) {
    confidence = 0.9;
    suggestion = "Check the weather.";
  } else if (lower.includes("timer")) {
    confidence = 0.9;
    suggestion = "Set a timer.";
  } else if (lower.includes("music")) {
    confidence = 0.85;
    suggestion = "Play some music.";
  }

  return { confidence, suggestion };
}
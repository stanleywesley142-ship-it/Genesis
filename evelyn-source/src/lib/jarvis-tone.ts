/**
 * jarvis-tone.ts — Jarvis-specific tone layer.
 */

export type JarvisTone = "snarky" | "helpful" | "concise" | "enthusiastic";

export function jarvisTone(text: string, tone: JarvisTone = "helpful"): string {
  switch (tone) {
    case "snarky":
      return `*sigh* ${text}`;
    case "enthusiastic":
      return `${text}!!`;
    case "concise":
      return text.split(".")[0] + ".";
    default:
      return text;
  }
}
/**
 * math-engine.ts — safe math evaluation for answerMath.
 */

export interface MathResult {
  expression: string;
  result: number;
  ok: boolean;
}

// Only allow a tiny safe grammar: digits, + - * /, parentheses, spaces, dots.
const SAFE = /^[0-9+\-*/().\s]+$/;

export function answerMath(expression: string): MathResult | null {
  const expr = (expression || "").trim();
  if (!expr) return null;
  if (!SAFE.test(expr)) {
    return { expression: expr, result: NaN, ok: false };
  }
  try {
    // eslint-disable-next-line no-eval
    const value = Function(`"use strict"; return (${expr});`)();
    if (typeof value !== "number" || !Number.isFinite(value)) {
      return { expression: expr, result: NaN, ok: false };
    }
    return { expression: expr, result: value, ok: true };
  } catch {
    return { expression: expr, result: NaN, ok: false };
  }
}

export function formatMathResult(r: MathResult): string {
  if (!r.ok) return `I couldn't compute "${r.expression}".`;
  return `${r.expression} = ${r.result}`;
}
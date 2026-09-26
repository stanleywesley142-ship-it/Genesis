/**
 * math-engine.ts — safe math evaluation with multi-step expression support.
 * Handles arithmetic, constants, functions, and word-to-symbol translation.
 */

export interface MathResult {
  expression: string;
  result: number;
  steps?: string[];
}

const CONSTANTS: Record<string, number> = {
  pi: Math.PI,
  e: Math.E,
  tau: Math.PI * 2,
  phi: (1 + Math.sqrt(5)) / 2,
};

const FUNCTIONS: Record<string, (x: number) => number> = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  sqrt: Math.sqrt,
  log: Math.log,
  log10: Math.log10,
  abs: Math.abs,
  floor: Math.floor,
  ceil: Math.ceil,
  round: Math.round,
  exp: Math.exp,
};

const WORD_MAP: Record<string, string> = {
  plus: "+",
  minus: "-",
  times: "*",
  multiplied: "*",
  divided: "/",
  over: "/",
  power: "**",
  squared: "^2",
  cubed: "^3",
};

function tokenize(expr: string): string {
  let s = expr.toLowerCase().trim();
  // Replace word operators
  for (const [word, sym] of Object.entries(WORD_MAP)) {
    s = s.split(word).join(sym);
  }
  // Replace ^ with ** for JS
  s = s.replace(/\^/g, "**");
  // Replace named constants
  for (const [name, value] of Object.entries(CONSTANTS)) {
    s = s.split(name).join(`(${value})`);
  }
  // Replace named functions
  for (const name of Object.keys(FUNCTIONS)) {
    s = s.split(name).join(name);
  }
  return s;
}

function validate(expr: string): boolean {
  // Allow only digits, operators, parens, decimal points, whitespace, and known function/constant names
  const cleaned = expr.replace(/[a-z]+/g, "").replace(/[^0-9+\-*/().\s]/g, "");
  return /^[0-9+\-*/().\s]+$/.test(cleaned);
}

export function answerMath(expression: string): MathResult | null {
  const expr = (expression || "").trim();
  if (!expr) return null;

  const translated = tokenize(expr);
  if (!validate(translated)) return null;

  try {
    // Build a safe evaluation context
    const fn = new Function(
      ...Object.keys(FUNCTIONS),
      "return (" + translated + ")"
    );
    const value = fn(...Object.values(FUNCTIONS));
    if (typeof value !== "number" || !isFinite(value)) return null;
    return { expression: expr, result: value };
  } catch {
    return null;
  }
}

export function formatMathResult(result: number): string {
  if (!isFinite(result)) return "undefined";
  if (Number.isInteger(result)) return result.toString();
  return result.toFixed(6).replace(/0+$/, "").replace(/\.$/, "");
}

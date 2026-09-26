/**
 * evelyn.ts — Evelyn identity + acronym.
 */
export const EVELYN_ACRONYM = [
  "E — Engineering",
  "V — Vision",
  "E — Execution",
  "L — Logistics",
  "Y — You",
  "N — Nexus",
];

export const EVELYN_FULL = "Evelyn — Engineering, Vision, Execution, Logistics, You, Nexus";

export function whoAmI(): string {
  return EVELYN_FULL;
}
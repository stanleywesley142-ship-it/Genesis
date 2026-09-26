/**
 * convex/settings.ts — settings backend.
 */
export interface Settings {
  theme: "dark" | "light";
  voiceEnabled: boolean;
  language: string;
}
const SETTINGS: Settings = { theme: "dark", voiceEnabled: true, language: "en" };
export function getSettings(): Settings { return SETTINGS; }
export function updateSettings(partial: Partial<Settings>): Settings {
  Object.assign(SETTINGS, partial);
  return SETTINGS;
}

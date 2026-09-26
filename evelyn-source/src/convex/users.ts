/**
 * convex/users.ts — user management backend.
 */

import { type User } from "./auth";

export interface UserPreferences {
  theme: "dark" | "light";
  voiceEnabled: boolean;
  notifications: boolean;
}

const PREFS: Record<string, UserPreferences> = {};

export function getPreferences(userId: string): UserPreferences {
  return (
    PREFS[userId] || {
      theme: "dark",
      voiceEnabled: true,
      notifications: true,
    }
  );
}

export function setPreferences(userId: string, prefs: Partial<UserPreferences>): UserPreferences {
  PREFS[userId] = { ...getPreferences(userId), ...prefs };
  return PREFS[userId];
}
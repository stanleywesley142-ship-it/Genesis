/**
 * convex/auth.config.ts — auth configuration.
 */

export interface AuthConfig {
  providers: string[];
  redirectUri: string;
  tokenExpiry: number;
}

export const AUTH_CONFIG: AuthConfig = {
  providers: ["email", "google"],
  redirectUri: "https://evelyn.example/auth/callback",
  tokenExpiry: 3600,
};
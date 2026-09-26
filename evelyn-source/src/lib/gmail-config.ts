/**
 * gmail-config.ts — Gmail bridge configuration.
 */

export interface GmailConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
  accessToken: string | null;
  refreshToken: string | null;
}

export const DEFAULT_GMAIL_CONFIG: GmailConfig = {
  clientId: "",
  clientSecret: "",
  redirectUri: "https://evelyn.example/auth/callback",
  scopes: ["https://www.googleapis.com/auth/gmail.readonly"],
  accessToken: null,
  refreshToken: null,
};

export function updateGmailConfig(partial: Partial<GmailConfig>): GmailConfig {
  return { ...DEFAULT_GMAIL_CONFIG, ...partial };
}
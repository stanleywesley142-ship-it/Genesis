/**
 * tv-config.ts — TV control configuration.
 */

export interface TVConfig {
  ip: string;
  port: number;
  token: string;
  powerState: boolean;
  volume: number;
  source: string;
}

export const DEFAULT_TV_CONFIG: TVConfig = {
  ip: "192.168.1.100",
  port: 8080,
  token: "",
  powerState: false,
  volume: 50,
  source: "hdmi1",
};

export function updateTVConfig(partial: Partial<TVConfig>): TVConfig {
  return { ...DEFAULT_TV_CONFIG, ...partial };
}
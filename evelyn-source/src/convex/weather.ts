/**
 * convex/weather.ts — weather / sky watch / fire check backend.
 */

export interface WeatherReport {
  location: string;
  temp: number;
  humidity: number;
  conditions: string;
  timestamp: number;
}

export function getWeather(location: string): WeatherReport {
  return {
    location,
    temp: 21,
    humidity: 45,
    conditions: "clear",
    timestamp: Date.now(),
  };
}
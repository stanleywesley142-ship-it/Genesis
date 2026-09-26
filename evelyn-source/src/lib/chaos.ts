/**
 * chaos.ts — stress tests for parser/brain/voice.
 */

import { parseCommand } from "./jarvis-parser";
import { think } from "./jarvis-brain";
import { cleanVoiceText, segmentForKokoro } from "./jarvis-voice";

export function chaosTest(): { pass: boolean; detail: string } {
  const inputs = [
    "a ".repeat(1000),
    "set a timer".repeat(100),
    "x".repeat(10000),
    "set a timer for 5 minutes and brew coffee and play music and read email and check weather and dim lights and lock doors and set thermostat and water plants and call mom",
  ];

  for (const input of inputs) {
    parseCommand(input);
    think(input);
    cleanVoiceText(input);
    segmentForKokoro(input);
  }

  return { pass: true, detail: "chaos complete" };
}
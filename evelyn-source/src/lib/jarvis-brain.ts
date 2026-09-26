/**
 * jarvis-brain.ts — replies + task/memory/status logic.
 */

import { parseCommand, type ParseResult } from "./jarvis-parser";
import { scheduleFollowup } from "./jarvis-followup";

export interface BrainResult {
  reply: string;
  tasks: Array<{ text: string; done: boolean }>;
  memory: string[];
  status: string;
}

const MEMORY: string[] = [];
const TASKS: Array<{ text: string; done: boolean }> = [];

export function think(input: string): BrainResult {
  const parsed: ParseResult = parseCommand(input);

  if (parsed.blocked) {
    return {
      reply: "I can't help with that request.",
      tasks: [...TASKS],
      memory: [...MEMORY],
      status: "blocked",
    };
  }

  const intent = parsed.intents[0];
  if (!intent || intent.type === "unknown") {
    return {
      reply: "I'm not sure how to help with that yet.",
      tasks: [...TASKS],
      memory: [...MEMORY],
      status: "unknown",
    };
  }

  // Memory: store the raw input.
  MEMORY.push(parsed.raw);

  let reply = "";
  let status = "ok";

  switch (intent.type) {
    case "timer":
      reply = "Timer set. I'll let you know when it's done.";
      break;
    case "alarm":
      reply = "Alarm set.";
      break;
    case "reminder":
      TASKS.push({ text: parsed.raw, done: false });
      scheduleFollowup(parsed.raw, 60000);
      reply = "Reminder added.";
      break;
    case "weather":
      reply = "The weather looks clear today.";
      break;
    case "music":
      reply = "Playing music.";
      break;
    case "movie":
      reply = "Starting the movie.";
      break;
    case "email":
      reply = "Checking your email.";
      break;
    case "message":
      reply = "Sending message.";
      break;
    case "call":
      reply = "Placing call.";
      break;
    case "photo":
      reply = "Opening camera.";
      break;
    case "video":
      reply = "Starting recording.";
      break;
    case "light":
      reply = "Adjusting lights.";
      break;
    case "lock":
      reply = "Locking doors.";
      break;
    case "thermostat":
      reply = "Adjusting thermostat.";
      break;
    case "camera":
      reply = "Checking cameras.";
      break;
    case "plant":
      reply = "Watering plants.";
      break;
    case "shopping":
      reply = "Opening shopping list.";
      break;
    case "note":
      reply = "Note saved.";
      break;
    case "navigate":
      reply = "Getting directions.";
      break;
    case "search":
      reply = "Searching.";
      break;
    case "translate":
      reply = "Translating.";
      break;
    case "convert":
      reply = "Converting.";
      break;
    case "calculate":
      reply = "Calculating.";
      break;
    case "brew":
      reply = "Brewing coffee.";
      break;
    case "boil":
      reply = "Boiling water.";
      break;
    case "bake":
      reply = "Baking.";
      break;
    case "chop":
      reply = "Chopping.";
      break;
    case "stir":
      reply = "Stirring.";
      break;
    case "heat":
      reply = "Heating.";
      break;
    case "feed":
      reply = "Feeding.";
      break;
    case "walk":
      reply = "Going for a walk.";
      break;
    case "clean":
      reply = "Cleaning.";
      break;
    case "organize":
      reply = "Organizing.";
      break;
    case "read":
      reply = "Reading.";
      break;
    case "write":
      reply = "Writing.";
      break;
    case "draw":
      reply = "Drawing.";
      break;
    case "code":
      reply = "Coding.";
      break;
    case "debug":
      reply = "Debugging.";
      break;
    case "deploy":
      reply = "Deploying.";
      break;
    case "test":
      reply = "Testing.";
      break;
    case "build":
      reply = "Building.";
      break;
    case "run":
      reply = "Running.";
      break;
    case "compile":
      reply = "Compiling.";
      break;
    case "lint":
      reply = "Linting.";
      break;
    case "git":
      reply = "Running git.";
      break;
    case "commit":
      reply = "Committing.";
      break;
    case "push":
      reply = "Pushing.";
      break;
    case "pull":
      reply = "Pulling.";
      break;
    case "merge":
      reply = "Merging.";
      break;
    case "branch":
      reply = "Branching.";
      break;
    case "install":
      reply = "Installing.";
      break;
    case "uninstall":
      reply = "Uninstalling.";
      break;
    case "backup":
      reply = "Backing up.";
      break;
    case "restore":
      reply = "Restoring.";
      break;
    case "sync":
      reply = "Syncing.";
      break;
    case "print":
      reply = "Printing.";
      break;
    case "scan":
      reply = "Scanning.";
      break;
    case "charge":
      reply = "Charging.";
      break;
    case "calibrate":
      reply = "Calibrating.";
      break;
    case "reset":
      reply = "Resetting.";
      break;
    case "encrypt":
      reply = "Encrypting.";
      break;
    case "decrypt":
      reply = "Decrypting.";
      break;
    case "compress":
      reply = "Compressing.";
      break;
    case "decompress":
      reply = "Decompressing.";
      break;
    case "archive":
      reply = "Archiving.";
      break;
    case "monitor":
      reply = "Monitoring.";
      break;
    case "observe":
      reply = "Observing.";
      break;
    case "track":
      reply = "Tracking.";
      break;
    case "log":
      reply = "Logging.";
      break;
    case "alert":
      reply = "Alert set.";
      break;
    case "notify":
      reply = "Notification sent.";
      break;
    case "schedule":
      reply = "Scheduled.";
      break;
    case "cancel":
      reply = "Cancelled.";
      break;
    case "postpone":
      reply = "Postponed.";
      break;
    case "reschedule":
      reply = "Rescheduled.";
      break;
    case "repeat":
      reply = "Repeating.";
      break;
    case "search_web":
      reply = "Searching the web.";
      break;
    case "search_local":
      reply = "Searching locally.";
      break;
    case "search_images":
      reply = "Searching images.";
      break;
    case "search_videos":
      reply = "Searching videos.";
      break;
    case "search_news":
      reply = "Searching news.";
      break;
    case "search_shopping":
      reply = "Searching shopping.";
      break;
    case "search_maps":
      reply = "Searching maps.";
      break;
    case "search_events":
      reply = "Searching events.";
      break;
    default:
      reply = "Done.";
      status = "ok";
  }

  return {
    reply,
    tasks: [...TASKS],
    memory: [...MEMORY],
    status,
  };
}

export function clearMemory(): void {
  MEMORY.length = 0;
  TASKS.length = 0;
}
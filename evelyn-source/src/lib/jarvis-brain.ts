/**
 * jarvis-brain.ts — replies + task/memory/status logic.
 */

import { parseCommand, parseCommandV2, type ParseResult } from "./jarvis-parser";
import { scheduleFollowup } from "./jarvis-followup";
import { deepThink, quickResearch, formOpinion } from "./deep-think";
import { addLearnedFact, listLearned, clearLearned } from "./learned";
import { EVELYN_ACRONYM, whoAmI } from "./evelyn";

export interface BrainResult {
  reply: string;
  tasks: Array<{ text: string; done: boolean }>;
  memory: string[];
  status: string;
}

const MEMORY: string[] = [];
const TASKS: Array<{ text: string; done: boolean }> = [];

export function think(input: string): BrainResult {
  const parsed: ParseResult = parseCommandV2 ? parseCommandV2(input) : parseCommand(input);

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

  // --- Enhanced intelligence ---
  // Deep think: multi-step reasoning
  if (intent.type === "deep_think") {
    const topic = parsed.raw.replace(/^(think|analyze|research|deep dive|explain|understand)/i, "").trim() || parsed.raw;
    try {
      const result = deepThink(topic);
      const reply = result.summary + " (confidence: " + Math.round(result.confidence * 100) + "%)";
      return { reply, tasks: [...TASKS], memory: [...MEMORY], status: "deep_think" };
    } catch (e) {
      // fall through
    }
  }

  // Quick research
  if (intent.type === "quick_research") {
    try {
      const results = quickResearch(parsed.raw);
      return { reply: results.join(" | "), tasks: [...TASKS], memory: [...MEMORY], status: "research" };
    } catch (e) {}
  }

  // Form opinion
  if (intent.type === "form_opinion") {
    try {
      const opinion = formOpinion(parsed.raw);
      return { reply: opinion, tasks: [...TASKS], memory: [...MEMORY], status: "opinion" };
    } catch (e) {}
  }

  // Identity
  if (intent.type === "identity") {
    return { reply: whoAmI() + " — " + EVELYN_ACRONYM.join(", "), tasks: [...TASKS], memory: [...MEMORY], status: "identity" };
  }

  // Learn
  if (intent.type === "learn") {
    try {
      addLearnedFact(parsed.raw, parsed.raw, 0.9);
      return { reply: "Learned and stored.", tasks: [...TASKS], memory: [...MEMORY], status: "learned" };
    } catch (e) {}
  }

  // Recall
  if (intent.type === "recall") {
    const facts = listLearned();
    if (facts.length === 0) return { reply: "I haven't learned anything yet.", tasks: [...TASKS], memory: [...MEMORY], status: "recall" };
    return { reply: "Here's what I know: " + facts.slice(-3).map((f) => f.fact).join(" | "), tasks: [...TASKS], memory: [...MEMORY], status: "recall" };
  }

  // Forget
  if (intent.type === "forget") {
    clearLearned();
    return { reply: "All learned facts cleared.", tasks: [...TASKS], memory: [...MEMORY], status: "forget" };
  }

  // System status
  if (intent.type === "system_status") {
    return { reply: "Systems online. CPU nominal, memory healthy, all subsystems operational.", tasks: [...TASKS], memory: [...MEMORY], status: "status" };
  }

  // Ops report
  if (intent.type === "ops_report") {
    return { reply: "Ops report: " + MEMORY.length + " memories, " + TASKS.length + " tasks, " + listLearned().length + " learned facts.", tasks: [...TASKS], memory: [...MEMORY], status: "ops" };
  }

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

export interface RouteResult {
  reply: string;
  action?: { type: string; [k: string]: unknown };
}

export function routeIntent(
  intent: { kind: string; [k: string]: unknown },
  _tasks: unknown[],
  _memory: unknown[]
): RouteResult {
  const kind = (intent as { kind: string }).kind;
  const action: RouteResult["action"] = { type: kind };

  switch (kind) {
    case "triageInbox":
      action.type = "triageInbox";
      return { reply: "Triaging your inbox.", action };
    case "readEmails":
      action.type = "readEmails";
      return { reply: "Reading your emails.", action };
    case "addTask":
      return { reply: "Task added.", action };
    case "workshop":
      return { reply: "Opening workshop.", action };
    case "workshopModel":
      return { reply: "Building model.", action };
    case "workshopSpawn":
      return { reply: "Spawning shape.", action };
    case "playFilm":
      return { reply: "Playing film.", action };
    case "playArtist":
      return { reply: "Playing artist.", action };
    case "playMusic":
      return { reply: "Playing music.", action };
    case "tv":
      return { reply: "Controlling TV.", action };
    case "tvVolume":
      return { reply: "Adjusting TV volume.", action };
    case "houseCommand":
      return { reply: "Sending house command.", action };
    case "fleetStatus":
      return { reply: "Checking fleet status.", action };
    case "deviceStatus":
      return { reply: "Checking device status.", action };
    case "deviceCommand":
      return { reply: "Sending device command.", action };
    case "mapOpen":
      return { reply: "Opening map.", action };
    case "poiSearch":
      return { reply: "Searching POI.", action };
    case "worldGrid":
      return { reply: "Showing globe.", action };
    case "weather":
      return { reply: "Checking weather.", action };
    case "deepThink":
      return { reply: "Thinking deeply.", action };
    case "quickResearch":
      return { reply: "Researching.", action };
    case "opinion":
      return { reply: "Forming opinion.", action };
    case "skyWatch":
      return { reply: "Watching the sky.", action };
    case "fireCheck":
      return { reply: "Checking fire risk.", action };
    case "afterHours":
      return { reply: "After-hours protocol engaged.", action };
    case "endAfterHours":
      return { reply: "After-hours protocol ended.", action };
    case "identity":
      return { reply: "I am Evelyn.", action };
    case "system":
      return { reply: "Here is your status report.", action };
    case "opsReport":
      return { reply: "Here is your ops report.", action };
    case "missedEvents":
      return { reply: "Here is what you missed.", action };
    case "cleanSlate":
      return { reply: "Clean slate protocol engaged.", action };
    case "listTasks":
      return { reply: "Here are your tasks.", action };
    case "completeTask":
      return { reply: "Task completed.", action };
    case "deleteTask":
      return { reply: "Task deleted.", action };
    case "clearTasks":
      return { reply: "Cleared completed tasks.", action };
    case "remember":
      return { reply: "Remembered.", action };
    case "recall":
      return { reply: "Here is what I remember.", action };
    case "recallLearned":
      return { reply: "Here is what I have learned.", action };
    case "forgetLearned":
      return { reply: "Forgot everything learned.", action };
    case "playSong":
      return { reply: "Playing song.", action };
    case "stopMusic":
      return { reply: "Stopped music.", action };
    case "playPlaylist":
      return { reply: "Playing playlist.", action };
    case "stopFilm":
      return { reply: "Stopped film.", action };
    case "nextEpisode":
      return { reply: "Next episode.", action };
    case "localFilm":
      return { reply: "Playing local film.", action };
    case "movieRef":
      return { reply: "Looking up movie reference.", action };
    case "tvApp":
      return { reply: "Opening TV app.", action };
    case "tvMode":
      return { reply: "Setting TV mode.", action };
    case "tvState":
      return { reply: "Here is the TV state.", action };
    case "houseStatus":
      return { reply: "Here is the house status.", action };
    case "repeatThat":
      return { reply: "Repeating that.", action };
    case "photoGallery":
      return { reply: "Showing photos.", action };
    case "photoGalleryHide":
      return { reply: "Hiding photos.", action };
    case "listFiles":
      return { reply: "Opening vault.", action };
    default:
      return { reply: "Done.", action };
  }
}
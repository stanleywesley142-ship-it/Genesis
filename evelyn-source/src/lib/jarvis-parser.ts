/**
 * jarvis-parser.ts — command parsing (79 intents, compounds, ban-list).
 */

export type IntentType =
  | "timer" | "alarm" | "reminder" | "weather" | "music" | "movie"
  | "email" | "message" | "call" | "photo" | "video" | "light"
  | "lock" | "thermostat" | "camera" | "plant" | "shopping" | "note"
  | "navigate" | "search" | "translate" | "convert" | "calculate"
  | "set" | "get" | "list" | "delete" | "update" | "create"
  | "open" | "close" | "start" | "stop" | "pause" | "resume"
  | "play" | "record" | "share" | "send" | "save" | "export"
  | "sleep" | "wake" | "reboot" | "shutdown"
  | "chat" | "ask" | "tell" | "show" | "hide" | "toggle"
  | "brew" | "boil" | "bake" | "chop" | "stir" | "heat"
  | "water" | "feed" | "walk" | "clean" | "organize" | "vacuum"
  | "read" | "write" | "draw" | "paint" | "code" | "debug"
  | "deploy" | "test" | "build" | "run" | "compile" | "lint"
  | "git" | "commit" | "push" | "pull" | "merge" | "branch"
  | "install" | "uninstall" | "update" | "upgrade" | "downgrade"
  | "backup" | "restore" | "sync" | "print" | "scan"
  | "charge" | "calibrate" | "reset" | "format"
  | "encrypt" | "decrypt" | "compress" | "decompress" | "archive"
  | "monitor" | "observe" | "track" | "log" | "alert" | "notify"
  | "schedule" | "cancel" | "postpone" | "reschedule" | "repeat"
  | "search_web" | "search_local" | "search_images" | "search_videos"
  | "search_news" | "search_shopping" | "search_maps" | "search_events"
  | "deep_think" | "quick_research" | "form_opinion" | "identity"
  | "learn" | "recall" | "forget" | "system_status" | "ops_report"
  | "workshop" | "workshop_model" | "workshop_spawn" | "tv" | "tv_volume"
  | "house_command" | "fleet_status" | "device_status" | "device_command"
  | "map_open" | "poi_search" | "world_grid" | "sky_watch" | "fire_check"
  | "after_hours" | "end_after_hours" | "clean_slate" | "list_tasks"
  | "complete_task" | "delete_task" | "clear_tasks" | "remember" | "recall_learned"
  | "forget_learned" | "play_song" | "stop_music" | "play_playlist"
  | "stop_film" | "next_episode" | "local_film" | "movie_ref" | "tv_app"
  | "tv_mode" | "tv_state" | "house_status" | "repeat_that"
  | "photo_gallery" | "photo_gallery_hide" | "list_files"
  | "triage_inbox" | "read_emails" | "add_task" | "play_film" | "play_artist"
  | "unknown";

export interface ParsedIntent {
  type: IntentType;
  raw: string;
  params: Record<string, unknown>;
  confidence: number;
}

export interface ParseResult {
  intents: ParsedIntent[];
  raw: string;
  blocked: boolean;
  blockReason?: string;
}

const BAN_LIST = [
  /bomb/i, /weapon/i, /kill/i, /murder/i, /suicide/i,
  /illegal/i, /hack/i, /malware/i, /phishing/i, /fraud/i,
  /steal/i, /rob/i, /assault/i, /abuse/i, /harass/i,
];

const INTENT_PATTERNS: Array<[RegExp, IntentType]> = [
  [/set a timer|timer for|start a timer/, "timer"],
  [/alarm|wake up/, "alarm"],
  [/remind me|reminder/, "reminder"],
  [/weather|temperature/, "weather"],
  [/play music|music on|song/, "music"],
  [/movie|film|watch/, "movie"],
  [/email|gmail|mail/, "email"],
  [/message|text|chat/, "message"],
  [/call|phone|dial/, "call"],
  [/photo|picture|camera/, "photo"],
  [/video|record/, "video"],
  [/light|lamp|dim/, "light"],
  [/lock/, "lock"],
  [/thermostat|temperature/, "thermostat"],
  [/camera|security/, "camera"],
  [/water|plant/, "plant"],
  [/shopping|buy|order/, "shopping"],
  [/note|write down/, "note"],
  [/navigate|directions|go to/, "navigate"],
  [/search|find/, "search"],
  [/translate/, "translate"],
  [/convert/, "convert"],
  [/calculate|math/, "calculate"],
  [/brew|coffee|espresso/, "brew"],
  [/boil/, "boil"],
  [/bake/, "bake"],
  [/chop|cut/, "chop"],
  [/stir/, "stir"],
  [/heat/, "heat"],
  [/feed/, "feed"],
  [/walk/, "walk"],
  [/clean|vacuum/, "clean"],
  [/organize/, "organize"],
  [/read/, "read"],
  [/write/, "write"],
  [/draw|paint/, "draw"],
  [/code|program/, "code"],
  [/debug/, "debug"],
  [/deploy/, "deploy"],
  [/test/, "test"],
  [/build/, "build"],
  [/run/, "run"],
  [/compile/, "compile"],
  [/lint/, "lint"],
  [/git/, "git"],
  [/commit/, "commit"],
  [/push/, "push"],
  [/pull/, "pull"],
  [/merge/, "merge"],
  [/branch/, "branch"],
  [/install/, "install"],
  [/uninstall/, "uninstall"],
  [/backup/, "backup"],
  [/restore/, "restore"],
  [/sync/, "sync"],
  [/print/, "print"],
  [/scan/, "scan"],
  [/charge/, "charge"],
  [/calibrate/, "calibrate"],
  [/reset/, "reset"],
  [/encrypt/, "encrypt"],
  [/decrypt/, "decrypt"],
  [/compress/, "compress"],
  [/decompress/, "decompress"],
  [/archive/, "archive"],
  [/monitor/, "monitor"],
  [/observe/, "observe"],
  [/track/, "track"],
  [/log/, "log"],
  [/alert/, "alert"],
  [/notify/, "notify"],
  [/schedule/, "schedule"],
  [/cancel/, "cancel"],
  [/postpone/, "postpone"],
  [/reschedule/, "reschedule"],
  [/repeat/, "repeat"],
  [/search web|google/, "search_web"],
  [/search local|find file/, "search_local"],
  [/search images/, "search_images"],
  [/search videos/, "search_videos"],
  [/search news/, "search_news"],
  [/search shopping/, "search_shopping"],
  [/search maps/, "search_maps"],
  [/search events/, "search_events"],
];

export function parseCommand(input: string): ParseResult {
  const raw = (input || "").trim();
  if (!raw) return { intents: [], raw, blocked: false };

  for (const pattern of BAN_LIST) {
    if (pattern.test(raw)) {
      return { intents: [], raw, blocked: true, blockReason: "ban-list match" };
    }
  }

  // Split on " and " for compounds.
  const parts = raw.split(/\s+and\s+/i).map((s) => s.trim()).filter(Boolean);
  const intents: ParsedIntent[] = [];

  for (const part of parts) {
    let matched: IntentType = "unknown";
    let confidence = 0;
    for (const [regex, type] of INTENT_PATTERNS) {
      if (regex.test(part)) {
        matched = type;
        confidence = 0.9;
        break;
      }
    }
    intents.push({
      type: matched,
      raw: part,
      params: {},
      confidence,
    });
  }

  return { intents: intents.filter((i) => i.type !== "unknown"), raw, blocked: false };
}

// Alias used by the ability-suite: returns a single intent-shaped object.
export function parseIntent(text: string): ParsedIntent & { kind: string; [k: string]: unknown } {
  const res = parseCommand(text);
  const first = res.intents[0];
  if (!first) {
    return { kind: "unknown", raw: text, params: {}, confidence: 0 } as ParsedIntent & { kind: string; [k: string]: unknown };
  }
  return { ...first, kind: first.type } as ParsedIntent & { kind: string; [k: string]: unknown };
}

export type Tone = "warm" | "professional" | "casual" | "formal" | "energetic" | "calm";

export function classifyTone(text: string): Tone {
  const t = (text || "").toLowerCase();
  if (/energiz|excit|wow|great/i.test(t)) return "energetic";
  if (/please|sir|madam|formal/i.test(t)) return "formal";
  if (/hey|hi|hello|sup/i.test(t)) return "casual";
  if (/work|report|status|diagnostic|ops|system/i.test(t)) return "professional";
  return "warm";
}

export const INTENT_COUNT = INTENT_PATTERNS.length;

// --- Semantic matching layer ---
const SEMANTIC_RULES: Array<{ keywords: string[]; intent: IntentType }> = [
  { keywords: ["think", "analyze", "research", "deep dive", "explain", "understand"], intent: "deep_think" },
  { keywords: ["search", "google", "find", "lookup"], intent: "search_web" },
  { keywords: ["opinion", "what do you think", "your take"], intent: "form_opinion" },
  { keywords: ["who are you", "who is evelyn", "introduce yourself", "identity"], intent: "identity" },
  { keywords: ["learn", "remember this", "memorize", "store"], intent: "learn" },
  { keywords: ["recall", "what did i", "what have i", "remember"], intent: "recall" },
  { keywords: ["forget", "delete this", "clear memory"], intent: "forget" },
  { keywords: ["status", "how are things", "system health", "diagnostics"], intent: "system_status" },
  { keywords: ["ops", "operations", "report"], intent: "ops_report" },
  { keywords: ["workshop", "3d", "model", "cad", "build", "spawn"], intent: "workshop" },
  { keywords: ["tv", "television", "watch show", "episode", "channel"], intent: "tv" },
  { keywords: ["house", "home", "lights", "thermostat", "lock", "door"], intent: "house_command" },
  { keywords: ["device", "phone", "laptop", "tablet", "battery"], intent: "device_status" },
  { keywords: ["map", "navigate", "directions", "route", "location"], intent: "map_open" },
  { keywords: ["sky", "stars", "planet", "iss", "astronomy", "space"], intent: "sky_watch" },
  { keywords: ["fire", "wildfire", "burning", "emergency"], intent: "fire_check" },
  { keywords: ["after hours", "night mode", "sleep mode"], intent: "after_hours" },
  { keywords: ["clean slate", "reset all", "start over"], intent: "clean_slate" },
  { keywords: ["tasks", "todo", "to do"], intent: "list_tasks" },
  { keywords: ["complete", "done", "finished with"], intent: "complete_task" },
  { keywords: ["delete task", "remove task"], intent: "delete_task" },
  { keywords: ["clear completed", "clear done"], intent: "clear_tasks" },
  { keywords: ["what have you learned", "learned facts"], intent: "recall_learned" },
  { keywords: ["forget everything", "wipe learned"], intent: "forget_learned" },
  { keywords: ["play song", "play track"], intent: "play_song" },
  { keywords: ["stop music", "pause music", "mute"], intent: "stop_music" },
  { keywords: ["playlist", "queue"], intent: "play_playlist" },
  { keywords: ["stop film", "stop movie", "pause video"], intent: "stop_film" },
  { keywords: ["next episode", "next season"], intent: "next_episode" },
  { keywords: ["local film", "local movie", "watch offline"], intent: "local_film" },
  { keywords: ["movie ref", "film reference", "actor", "director"], intent: "movie_ref" },
  { keywords: ["tv app", "open tv", "launch tv"], intent: "tv_app" },
  { keywords: ["tv mode", "cinema mode", "movie mode"], intent: "tv_mode" },
  { keywords: ["tv state", "what's on tv", "current channel"], intent: "tv_state" },
  { keywords: ["house status", "home status", "house overview"], intent: "house_status" },
  { keywords: ["repeat that", "say again", "what did you say"], intent: "repeat_that" },
  { keywords: ["photos", "gallery", "pictures", "images"], intent: "photo_gallery" },
  { keywords: ["hide photos", "close gallery"], intent: "photo_gallery_hide" },
  { keywords: ["files", "vault", "documents", "list files"], intent: "list_files" },
  { keywords: ["triage", "inbox", "sort email"], intent: "triage_inbox" },
  { keywords: ["read emails", "read mail", "check mail"], intent: "read_emails" },
  { keywords: ["add task", "new task", "create task"], intent: "add_task" },
  { keywords: ["play film", "play movie", "watch movie"], intent: "play_film" },
  { keywords: ["play artist", "play band"], intent: "play_artist" },
  { keywords: ["fleet", "vehicles", "cars"], intent: "fleet_status" },
  { keywords: ["poi", "points of interest", "nearby"], intent: "poi_search" },
  { keywords: ["world grid", "globe", "earth view"], intent: "world_grid" },
];

function semanticMatch(text: string): ParsedIntent[] {
  const lower = text.toLowerCase();
  const matches: ParsedIntent[] = [];
  for (const rule of SEMANTIC_RULES) {
    for (const kw of rule.keywords) {
      if (lower.includes(kw)) {
        matches.push({ type: rule.intent, raw: text, params: { keyword: kw }, confidence: 0.85 });
        break;
      }
    }
  }
  return matches;
}

export function parseCommandV2(input: string): ParseResult {
  const base = parseCommand(input);
  if (base.blocked) return base;
  if (base.intents.length > 0) return base;
  const semantic = semanticMatch(input);
  if (semantic.length > 0) {
    return { intents: semantic, raw: input, blocked: false };
  }
  return base;
}

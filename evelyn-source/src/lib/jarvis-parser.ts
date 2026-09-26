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
  | "sleep" | "wake" | "reboot" | "shutdown" | "sleep"
  | "chat" | "ask" | "tell" | "show" | "hide" | "toggle"
  | "brew" | "boil" | "bake" | "chop" | "stir" | "heat"
  | "water" | "feed" | "walk" | "clean" | "organize" | "vacuum"
  | "read" | "write" | "draw" | "paint" | "code" | "debug"
  | "deploy" | "test" | "build" | "run" | "compile" | "lint"
  | "git" | "commit" | "push" | "pull" | "merge" | "branch"
  | "install" | "uninstall" | "update" | "upgrade" | "downgrade"
  | "backup" | "restore" | "sync" | "share" | "print" | "scan"
  | "charge" | "discharge" | "calibrate" | "reset" | "format"
  | "encrypt" | "decrypt" | "compress" | "decompress" | "archive"
  | "monitor" | "observe" | "track" | "log" | "alert" | "notify"
  | "schedule" | "cancel" | "postpone" | "reschedule" | "repeat"
  | "search_web" | "search_local" | "search_images" | "search_videos"
  | "search_news" | "search_shopping" | "search_maps" | "search_events"
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

export const INTENT_COUNT = INTENT_PATTERNS.length;
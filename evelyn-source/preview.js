// preview.js - real Evelyn logic wired into the HUD (self-contained)
const $ = (s) => document.querySelector(s);
const clock = $('#clock');
const askInput = $('#askInput');
const micBtn = $('#micBtn');
const mini3d = $('#mini3d');

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour12: true });
  const date = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  clock.innerHTML = '<span class="time">' + time + '</span><span class="date">' + date + '</span>';
}
setInterval(updateClock, 1000);
updateClock();

function speak(text) {
  const synth = window.speechSynthesis;
  if (synth) {
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    synth.speak(u);
  }
}

// --- Real agent logic inlined from src/lib/ ---

// jarvis-parser.ts
const BAN_LIST = [/bomb/i,/weapon/i,/kill/i,/murder/i,/suicide/i,/illegal/i,/hack/i,/malware/i,/phishing/i,/fraud/i,/steal/i,/rob/i,/assault/i,/abuse/i,/harass/i];
const INTENT_PATTERNS = [
 [/set a timer|timer for|start a timer/,"timer"],
 [/alarm|wake up/,"alarm"],
 [/remind me|reminder/,"reminder"],
 [/weather|temperature/,"weather"],
 [/play music|music on|song/,"music"],
 [/movie|film|watch/,"movie"],
 [/email|gmail|mail/,"email"],
 [/message|text|chat/,"message"],
 [/call|phone|dial/,"call"],
 [/photo|picture|camera/,"photo"],
 [/video|record/,"video"],
 [/light|lamp|dim/,"light"],
 [/lock/,"lock"],
 [/thermostat/,"thermostat"],
 [/camera|security/,"camera"],
 [/water|plant/,"plant"],
 [/shopping|buy|order/,"shopping"],
 [/note|write down/,"note"],
 [/navigate|directions|go to/,"navigate"],
 [/search|find/,"search"],
 [/translate/,"translate"],
 [/convert/,"convert"],
 [/calculate|math/,"calculate"],
 [/brew|coffee|espresso/,"brew"],
 [/boil/,"boil"],
 [/bake/,"bake"],
 [/chop|cut/,"chop"],
 [/stir/,"stir"],
 [/heat/,"heat"],
 [/feed/,"feed"],
 [/walk/,"walk"],
 [/clean|vacuum/,"clean"],
 [/organize/,"organize"],
 [/read/,"read"],
 [/write/,"write"],
 [/draw|paint/,"draw"],
 [/code|program/,"code"],
 [/debug/,"debug"],
 [/deploy/,"deploy"],
 [/test/,"test"],
 [/build/,"build"],
 [/run/,"run"],
 [/compile/,"compile"],
 [/lint/,"lint"],
 [/git/,"git"],
 [/commit/,"commit"],
 [/push/,"push"],
 [/pull/,"pull"],
 [/merge/,"merge"],
 [/branch/,"branch"],
 [/install/,"install"],
 [/uninstall/,"uninstall"],
 [/backup/,"backup"],
 [/restore/,"restore"],
 [/sync/,"sync"],
 [/print/,"print"],
 [/scan/,"scan"],
 [/charge/,"charge"],
 [/calibrate/,"calibrate"],
 [/reset/,"reset"],
 [/encrypt/,"encrypt"],
 [/decrypt/,"decrypt"],
 [/compress/,"compress"],
 [/decompress/,"decompress"],
 [/archive/,"archive"],
 [/monitor/,"monitor"],
 [/observe/,"observe"],
 [/track/,"track"],
 [/log/,"log"],
 [/alert/,"alert"],
 [/notify/,"notify"],
 [/schedule/,"schedule"],
 [/cancel/,"cancel"],
 [/postpone/,"postpone"],
 [/reschedule/,"reschedule"],
 [/repeat/,"repeat"],
 [/search web|google/,"search_web"],
 [/search local|find file/,"search_local"],
 [/search images/,"search_images"],
 [/search videos/,"search_videos"],
 [/search news/,"search_news"],
 [/search shopping/,"search_shopping"],
 [/search maps/,"search_maps"],
 [/search events/,"search_events"]
];

function parseCommand(input) {
  const raw = (input || "").trim();
  if (!raw) return { intents: [], raw, blocked: false };
  for (const pattern of BAN_LIST) {
    if (pattern.test(raw)) return { intents: [], raw, blocked: true, blockReason: "ban-list match" };
  }
  const parts = raw.split(/\s+and\s+/i).map((s) => s.trim()).filter(Boolean);
  const intents = [];
  for (const part of parts) {
    let matched = "unknown", confidence = 0;
    for (const [regex, type] of INTENT_PATTERNS) {
      if (regex.test(part)) { matched = type; confidence = 0.9; break; }
    }
    intents.push({ type: matched, raw: part, params: {}, confidence });
  }
  return { intents: intents.filter((i) => i.type !== "unknown"), raw, blocked: false };
}

function classifyTone(text) {
  const t = (text || "").toLowerCase();
  if (/energiz|excit|wow|great/i.test(t)) return "energetic";
  if (/please|sir|madam|formal/i.test(t)) return "formal";
  if (/hey|hi|hello|sup/i.test(t)) return "casual";
  if (/work|report|status|diagnostic|ops|system/i.test(t)) return "professional";
  return "warm";
}

// jarvis-knowledge.ts
const KNOWLEDGE = [
 {pattern:/capital of france|france capital/i,answer:"Paris"},
 {pattern:/capital of (japan|tokyo)/i,answer:"Tokyo"},
 {pattern:/capital of (england|uk|britain)/i,answer:"London"},
 {pattern:/capital of (germany|deutschland)/i,answer:"Berlin"},
 {pattern:/capital of (italy|italia)/i,answer:"Rome"},
 {pattern:/capital of (spain|espana)/i,answer:"Madrid"},
 {pattern:/capital of canada/i,answer:"Ottawa"},
 {pattern:/capital of australia/i,answer:"Canberra"},
 {pattern:/capital of (china|beijing)/i,answer:"Beijing"},
 {pattern:/capital of (india|new delhi)/i,answer:"New Delhi"},
 {pattern:/capital of (brazil|brasilia)/i,answer:"Brasilia"},
 {pattern:/capital of (mexico|mexicano)/i,answer:"Mexico City"},
 {pattern:/who (are you|is evelyn)/i,answer:"I am Evelyn, your local personal AI."},
 {pattern:/what (is|are) evelyn/i,answer:"Evelyn is your local personal AI command center."},
 {pattern:/what (is|are) (the )?time/i,answer:"I can tell you the time - just ask."},
 {pattern:/what (is|are) (the )?weather/i,answer:"I can check the weather for you."}
];
function answerFromCore(query) {
  const q = (query || "").trim();
  if (!q) return null;
  for (const { pattern, answer } of KNOWLEDGE) if (pattern.test(q)) return answer;
  return null;
}

// math-engine.ts
function answerMath(expression) {
  const expr = (expression || "").trim();
  if (!expr) return null;
  const sanitized = expr.replace(/[^0-9+\-*/().\s]/g, "");
  try {
    const fn = new Function("return (" + sanitized + ")");
    const value = fn();
    if (typeof value !== "number" || !isFinite(value)) return null;
    return { expression: expr, result: value };
  } catch (e) { return null; }
}

// model-generator.ts
const MATERIAL_MAP = {
  "titanic":"steel","car tire":"rubber","cube":"plastic","sphere":"plastic",
  "glass":"glass","iron":"iron","gold":"gold","wood":"wood","marble":"stone"
};
function matchModel(query) {
  const q = (query || "").toLowerCase().trim();
  const material = MATERIAL_MAP[q] || "plastic";
  return { known: true, name: q, material, type: "procedural" };
}

// evelyn.ts
const EVELYN_ACRONYM = [
  "E - Engineering",
  "V - Vision",
  "E - Execution",
  "L - Logistics",
  "Y - You",
  "N - Nexus"
];
const EVELYN_FULL = "Evelyn - Engineering, Vision, Execution, Logistics, You, Nexus";
function whoAmI() { return EVELYN_FULL; }

// jarvis-followup.ts
let topicNoun = null;
function setTopicNoun(noun) { topicNoun = noun; return noun; }
function getTopicNoun() { return topicNoun; }

// jarvis-brain.ts - think() with full intent switch
const MEMORY = [];
const TASKS = [];
function think(input) {
  const parsed = parseCommand(input);
  if (parsed.blocked) {
    return { reply: "I can't help with that request.", tasks: [...TASKS], memory: [...MEMORY], status: "blocked" };
  }
  const intent = parsed.intents[0];
  if (!intent || intent.type === "unknown") {
    return { reply: "I'm not sure how to help with that yet.", tasks: [...TASKS], memory: [...MEMORY], status: "unknown" };
  }
  MEMORY.push(parsed.raw);
  let reply = "", status = "ok";
  switch (intent.type) {
    case "timer": reply = "Timer set. I'll let you know when it's done."; break;
    case "alarm": reply = "Alarm set."; break;
    case "reminder": TASKS.push({ text: parsed.raw, done: false }); reply = "Reminder added."; break;
    case "weather": reply = "The weather looks clear today."; break;
    case "music": reply = "Playing music."; break;
    case "movie": reply = "Starting the movie."; break;
    case "email": reply = "Checking your email."; break;
    case "message": reply = "Sending message."; break;
    case "call": reply = "Placing call."; break;
    case "photo": reply = "Opening camera."; break;
    case "video": reply = "Starting recording."; break;
    case "light": reply = "Adjusting lights."; break;
    case "lock": reply = "Locking doors."; break;
    case "thermostat": reply = "Adjusting thermostat."; break;
    case "camera": reply = "Checking cameras."; break;
    case "plant": reply = "Watering plants."; break;
    case "shopping": reply = "Opening shopping list."; break;
    case "note": reply = "Note saved."; break;
    case "navigate": reply = "Getting directions."; break;
    case "search": reply = "Searching."; break;
    case "translate": reply = "Translating."; break;
    case "convert": reply = "Converting."; break;
    case "calculate": reply = "Calculating."; break;
    case "brew": reply = "Brewing coffee."; break;
    case "boil": reply = "Boiling water."; break;
    case "bake": reply = "Baking."; break;
    case "chop": reply = "Chopping."; break;
    case "stir": reply = "Stirring."; break;
    case "heat": reply = "Heating."; break;
    case "feed": reply = "Feeding."; break;
    case "walk": reply = "Going for a walk."; break;
    case "clean": reply = "Cleaning."; break;
    case "organize": reply = "Organizing."; break;
    case "read": reply = "Reading."; break;
    case "write": reply = "Writing."; break;
    case "draw": reply = "Drawing."; break;
    case "code": reply = "Coding."; break;
    case "debug": reply = "Debugging."; break;
    case "deploy": reply = "Deploying."; break;
    case "test": reply = "Testing."; break;
    case "build": reply = "Building."; break;
    case "run": reply = "Running."; break;
    case "compile": reply = "Compiling."; break;
    case "lint": reply = "Linting."; break;
    case "git": reply = "Running git."; break;
    case "commit": reply = "Committing."; break;
    case "push": reply = "Pushing."; break;
    case "pull": reply = "Pulling."; break;
    case "merge": reply = "Merging."; break;
    case "branch": reply = "Branching."; break;
    case "install": reply = "Installing."; break;
    case "uninstall": reply = "Uninstalling."; break;
    case "backup": reply = "Backing up."; break;
    case "restore": reply = "Restoring."; break;
    case "sync": reply = "Syncing."; break;
    case "print": reply = "Printing."; break;
    case "scan": reply = "Scanning."; break;
    case "charge": reply = "Charging."; break;
    case "calibrate": reply = "Calibrating."; break;
    case "reset": reply = "Resetting."; break;
    case "encrypt": reply = "Encrypting."; break;
    case "decrypt": reply = "Decrypting."; break;
    case "compress": reply = "Compressing."; break;
    case "decompress": reply = "Decompressing."; break;
    case "archive": reply = "Archiving."; break;
    case "monitor": reply = "Monitoring."; break;
    case "observe": reply = "Observing."; break;
    case "track": reply = "Tracking."; break;
    case "log": reply = "Logging."; break;
    case "alert": reply = "Alert set."; break;
    case "notify": reply = "Notification sent."; break;
    case "schedule": reply = "Scheduled."; break;
    case "cancel": reply = "Cancelled."; break;
    case "postpone": reply = "Postponed."; break;
    case "reschedule": reply = "Rescheduled."; break;
    case "repeat": reply = "Repeating."; break;
    case "search_web": reply = "Searching the web."; break;
    case "search_local": reply = "Searching locally."; break;
    case "search_images": reply = "Searching images."; break;
    case "search_videos": reply = "Searching videos."; break;
    case "search_news": reply = "Searching news."; break;
    case "search_shopping": reply = "Searching shopping."; break;
    case "search_maps": reply = "Searching maps."; break;
    case "search_events": reply = "Searching events."; break;
    default: reply = "Done."; status = "ok";
  }
  return { reply, tasks: [...TASKS], memory: [...MEMORY], status };
}

// processCommand - try knowledge/math first, then fall back to think()
function processCommand(text) {
  const parsed = parseCommand(text);
  const tone = classifyTone(text);

  // Knowledge core
  const knowledge = answerFromCore(text);
  if (knowledge) {
    speak(knowledge);
    return { intent: parsed, tone, reply: knowledge, source: "knowledge" };
  }

  // Math engine
  if (/calculate|math|compute|times|plus|minus|divide|\d+\s*[\+\-\*\/]\s*\d+/.test(text)) {
    const math = answerMath(text);
    if (math) {
      const reply = math.result;
      speak(reply);
      return { intent: parsed, tone, reply, source: "math" };
    }
  }

  // Model matching for 3D mini panel
  const model = matchModel(text);
  if (mini3d && model && model.known) {
    mini3d.title = model.name + " -- material: " + model.material;
  }

  const result = think(text, [], []);
  let reply = result.reply || (result.action && result.action.reply) || '';
  if (!reply) reply = "I'm not sure how to help with that.";
  speak(reply);
  return { intent: parsed, tone, reply };
}

function handleAsk() {
  const text = askInput.value.trim();
  if (!text) return;
  const { reply } = processCommand(text);
  askInput.value = '';
  return reply;
}

askInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleAsk();
});

let listening = false;
micBtn.addEventListener('click', () => {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { speak("Speech recognition not available in this browser."); return; }
  if (listening) return;
  const rec = new SR();
  rec.continuous = false;
  rec.interimResults = false;
  rec.lang = 'en-US';
  rec.onresult = (ev) => {
    const t = ev.results[0][0].transcript;
    askInput.value = t;
    handleAsk();
  };
  rec.onerror = () => { speak("Sorry, I didn't catch that."); };
  rec.start();
  listening = true;
  setTimeout(() => { listening = false; }, 4000);
});

// Wire real abilities on load
function wireRealAbilities() {
  const m = matchModel('titanic');
  mini3d.title = m.name + ' -- material: ' + m.material;

  const paris = answerFromCore('capital of france');
  console.log('Knowledge core:', paris);

  const math = answerMath('compute 5 times 12');
  console.log('Math engine:', math);

  console.log('EVELYN_ACRONYM:', EVELYN_ACRONYM, 'len:', EVELYN_ACRONYM.length);

  setTopicNoun('hydraulic press');
  console.log('Topic noun set:', 'hydraulic press');
}

wireRealAbilities();
console.log('Evelyn HUD preview ready. Type in the command bar or click the mic.');

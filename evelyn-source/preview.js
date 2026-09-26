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

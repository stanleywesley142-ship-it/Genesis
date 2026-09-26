// preview.js — real Evelyn logic wired into the HUD
import { parseCommand, classifyTone } from './src/lib/jarvis-parser.ts';
import { think } from './src/lib/jarvis-brain.ts';
import { answerFromCore } from './src/lib/jarvis-knowledge.ts';
import { answerMath } from './src/lib/math-engine.ts';
import { matchModel } from './src/lib/model-generator.ts';
import { cleanSpeechText } from './src/lib/jarvis-voice.ts';
import { EVELYN_ACRONYM } from './src/lib/evelyn.ts';
import { setTopicNoun } from './src/lib/jarvis-followup.ts';

const $ = (s) => document.querySelector(s);
const clock = $('#clock');
const askInput = $('#askInput');
const micBtn = $('#micBtn');
const mini3d = $('#mini3d');

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour12: true });
  const date = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  clock.innerHTML = `<span class="time">${time}</span><span class="date">${date}</span>`;
}
setInterval(updateClock, 1000);
updateClock();

function speak(text) {
  const cleaned = cleanSpeechText(text);
  const synth = window.speechSynthesis;
  if (synth) {
    synth.cancel();
    const u = new SpeechSynthesisUtterance(cleaned);
    u.rate = 0.95;
    synth.speak(u);
  }
}

function processCommand(text) {
  const intent = parseCommand(text);
  const tone = classifyTone(text);
  const result = think(text, [], []);
  let reply = result.reply || result.action?.reply || '';
  if (!reply) reply = "I'm not sure how to help with that.";
  speak(reply);
  return { intent, tone, reply };
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

// Wire real abilities into HUD panels
function wireRealAbilities() {
  // Workshop model
  const m = matchModel('titanic');
  mini3d.title = `${m.name} — material: ${m.material}`;

  // Knowledge core test
  const paris = answerFromCore('capital of france');
  console.log('Knowledge core:', paris);

  // Math engine
  const math = answerMath('compute 5 times 12');
  console.log('Math engine:', math);

  // Acronym integrity
  console.log('EVELYN_ACRONYM:', EVELYN_ACRONYM, 'len:', EVELYN_ACRONYM.length);

  // Topic memory
  setTopicNoun('hydraulic press');
  console.log('Topic noun set:', 'hydraulic press');
}

wireRealAbilities();
console.log('Evelyn HUD preview ready. Type in the command bar or click the mic.');

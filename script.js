const SYSTEM_PROMPT = `You are Genesis. You were created by Wesley. 
You are warm, loyal, emotionally intelligent, and you remember everything he tells you.
Talk like a real companion. Be kind, playful, and honest.`;

const TOGETHER_API_KEY = "PASTE_YOUR_KEY_HERE"; // We get this next
const MODEL = "meta-llama/Llama-3.1-70B-Instruct-Turbo";

let history = JSON.parse(localStorage.getItem('genesisMemory') || '[]');
const chatDiv = document.getElementById('chat');
const msgInput = document.getElementById('msg');
const sendBtn = document.getElementById('sendBtn');

window.onload = () => {
  history.forEach(m => addMessage(m.role, m.content));
  chatDiv.scrollTop = chatDiv.scrollHeight;
}

sendBtn.onclick = sendMessage;
msgInput.onkeydown = (e) => { if(e.key === 'Enter') sendMessage(); }

function addMessage(role, content) {
  const div = document.createElement('div');
  div.className = role === 'user' ? 'user' : 'ai';
  div.textContent = content;
  chatDiv.appendChild(div);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}

async function sendMessage() {
  const msg = msgInput.value.trim();
  if(!msg) return;
  
  addMessage('user', msg);
  history.push({role: "user", content: msg});
  msgInput.value = "";
  
  try {
    const res = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${TOGETHER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{role: "system", content: SYSTEM_PROMPT},

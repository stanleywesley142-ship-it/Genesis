const GROQ_API_KEY = "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";

const inp = document.getElementById('inp');
const chat = document.getElementById('chat');
const sendBtn = document.getElementById('sendBtn');
const refreshBtn = document.getElementById('refreshBtn');

let conversation = []; // keeps memory so she sounds smart

function newConvo(){
  chat.innerHTML = '';
  inp.value = '';
  conversation = []; // clear memory
  window.scrollTo(0,0);
}

function preset(t){
  inp.value = t;
  send();
}

async function send(){
  const msg = inp.value.trim();
  if(!msg) return;

  chat.innerHTML += `<div class="user">${msg}</div>`;
  inp.value = '';
  conversation.push({role: "user", content: msg});

  // THIS MAKES HER GENESIS - CALM, WISE, WARM
  const systemPrompt = {
    role: "system",
    content: "You are Genesis. You are calm, wise, warm, and thoughtful. You help people untangle thoughts and make gentle next steps. You speak softly, like a close friend. You never rush. You ask good questions. Keep responses 2-4 paragraphs max. Be present."
  };

  try{
    // CORS WORKAROUND SO GITHUB PAGES CAN CALL GROQ
    const res = await fetch("https://corsproxy.io/?" + encodeURIComponent("https://api.groq.com/openai/v1/chat/completions"),{
      method:"POST",
      headers:{
        "Authorization":`Bearer ${GROQ_API_KEY}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        model:"llama-3.1-70b-versatile", // SMARTER MODEL
        messages: [systemPrompt,...conversation]
      })
    });

    const data = await res.json();
    const reply = data.choices[0].message.content;

    chat.innerHTML += `<div class="ai">${reply}</div>`;
    conversation.push({role: "assistant", content: reply});

  }catch(e){
    chat.innerHTML += `<div class="ai">Genesis is quiet right now. Error: Check your API key.</div>`;
    console.error(e);
  }
  window.scrollTo(0,document.body.scrollHeight);
}

// HOOK UP BUTTONS
sendBtn.addEventListener('click', send);
refreshBtn.addEventListener('click', newConvo);
document.getElementById('card1').addEventListener('click', ()=>preset('Untangle a thought'));
document.getElementById('card2').addEventListener('click', ()=>preset('Make a small plan'));
document.getElementById('card3').addEventListener('click', ()=>preset('Think out loud'));
inp.addEventListener('keypress', e=>{if(e.key==='Enter')send()});

// OWNER SIGN IN
const ownerBtn = document.getElementById('ownerBtn');
const ownerModal = document.getElementById('ownerModal');
const closeModal = document.getElementById('closeModal');
const ownerLoginBtn = document.getElementById('ownerLoginBtn');
const ownerPass = document.getElementById('ownerPass');
const ownerError = document.getElementById('ownerError');

const OWNER_PASSWORD = "genesis2025"; // CHANGE THIS

ownerBtn.onclick = function() {ownerModal.style.display = "block"}
closeModal.onclick = function() {ownerModal.style.display = "none"}
window.onclick = function(event) {if (event.target == ownerModal) {ownerModal.style.display = "none"}}

ownerLoginBtn.onclick = function(){
  if(ownerPass.value === OWNER_PASSWORD){

// Hide splash and show app
setTimeout(() => {
  document.getElementById('splash').style.display = 'none';
}, 2500);

// PUT YOUR GROQ KEY HERE
const GROQ_API_KEY = "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";

async function sendMessage() {
  const input = document.getElementById('userInput');
  const chat = document.getElementById('chat');
  const message = input.value;
  if (!message) return;
  
  chat.innerHTML += `<div class="user">${message}</div>`;
  input.value = '';
  
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {"Authorization": `Bearer ${GROQ_API_KEY}`, "Content-Type": "application/json"},
    body: JSON.stringify({model: "llama-3.1-8b-instant", messages: [{role: "user", content: message}]})
  });
  
  const data = await res.json();
  chat.innerHTML += `<div class="ai">${data.choices[0].message.content}</div>`;
  window.scrollTo(0, document.body.scrollHeight);
}

function startChat(text){
  document.getElementById('userInput').value = text;
  sendMessage();
}

document.getElementById('userInput').addEventListener('keypress', e => {
  if(e.key === 'Enter') sendMessage();
});

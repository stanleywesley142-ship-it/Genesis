const GROQ_API_KEY = "YOUR_KEY_GOES_IN_ENV_FILE";

// Genesis Chat Function with GROQ
async function sendMessage() {
  const input = document.getElementById('userInput');
  const chat = document.getElementById('chatBox');
  const message = input.value;
  if (!message) return;
  
  chat.innerHTML += `<div><b>You:</b> ${message}</div>`;
  input.value = '';

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [{role: "user", content: message}]
    })
  });
  
  const data = await response.json();
  chat.innerHTML += `<div><b>Genesis:</b> ${data.choices[0].message.content}</div>`;
}

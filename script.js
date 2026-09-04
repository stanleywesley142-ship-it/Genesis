const GEMINI_API_KEY = "AQ.Ab8RN6JHeIZsp0F7LthY2Bvh4oErxSYUjCah5yqui0AdzADDfg";

const inp = document.getElementById('inp');
const chat = document.getElementById('chat');
let conversation = [];

// 1. SPLASH
setTimeout(()=>{document.getElementById('splash').style.display='none'},2500);

// 2. SIDEBAR
const sidebar=document.getElementById('sidebar'),overlay=document.getElementById('overlay');
document.getElementById('menuBtn').onclick=()=>{sidebar.classList.add('open');overlay.classList.add('show')};
overlay.onclick=()=>{sidebar.classList.remove('open');overlay.classList.remove('show')};
document.getElementById('newConvoBtn').onclick=()=>{chat.innerHTML='';inp.value='';conversation=[];window.scrollTo(0,0);overlay.click()};
document.getElementById('refreshBtn').onclick=()=>{chat.innerHTML='';inp.value='';conversation=[];window.scrollTo(0,0)};

// 3. CARDS
document.querySelectorAll('.card').forEach(card=>{
  card.onclick=()=>{inp.value=card.dataset.prompt;send()}
})

// 4. SEND FUNCTION - TESTED WITH GEMINI
async function send(){
  const msg = inp.value.trim(); 
  if(!msg) return;
  
  chat.innerHTML += `<div class="user">${msg}</div>`; 
  inp.value='';
  
  let contents = [
    {role: "user", parts: [{text: "You are Genesis. Calm, wise, warm, thoughtful. Help people untangle thoughts. Speak softly like a close friend. 2-4 paragraphs max."}]},
    {role: "model", parts: [{text: "I am here. What is on your mind?"}]}
  ];
  
  conversation.forEach(m => {
    contents.push({role: m.role === "user"? "user" : "model", parts: [{text: m.content}]})
  });
  contents.push({role: "user", parts: [{text: msg}]});
  conversation.push({role: "user", content: msg});

  chat.innerHTML += `<div class="ai" id="thinking">Genesis is thinking...</div>`;
  window.scrollTo(0,document.body.scrollHeight);

  try{
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({contents, generationConfig: {temperature: 0.8, maxOutputTokens: 500}})
    });
    
    const data = await res.json();
    document.getElementById('thinking').remove();
    
    if(data.error) throw new Error(data.error.message);
    const reply = data.candidates[0].content.parts[0].text;
    chat.innerHTML += `<div class="ai">${reply}</div>`;
    conversation.push({role: "assistant", content: reply});
    
  }catch(e){
    document.getElementById('thinking').remove();
    chat.innerHTML += `<div class="ai">Error: ${e.message}. Check your API key.</div>`;
  }
  window.scrollTo(0,document.body.scrollHeight);
}

document.getElementById('sendBtn').onclick=send;
inp.onkeypress=e=>{if(e.key==='Enter')send()};

// 5. OWNER MODAL
const ownerBtn=document.getElementById('ownerBtn'),ownerModal=document.getElementById('ownerModal');
document.getElementById('closeModal').onclick=()=>ownerModal.style.display="none";
window.onclick=e=>{if(e.target==ownerModal)ownerModal.style.display="none"};
ownerBtn.onclick=()=>ownerModal.style.display="block";
document.getElementById('ownerLoginBtn').onclick=()=>{
  if(document.getElementById('ownerPass').value==="genesis2025"){
    alert("Welcome back, Owner"); ownerModal.style.display="none";
  }else{document.getElementById('ownerError').innerText="Wrong password"}
}

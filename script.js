setTimeout(()=>{document.getElementById('splash').style.display='none'},2300);
function toggleMenu(){document.getElementById('sidebar').classList.toggle('open');document.getElementById('overlay').classList.toggle('show')}

const GROQ_API_KEY = "PASTE_YOUR_GROQ_KEY_HERE"; // <-- PUT YOUR KEY HERE

async function send(){
  const inp=document.getElementById('inp');
  const chat=document.getElementById('chat');
  const msg=inp.value; if(!msg) return;
  chat.innerHTML+=`<div class="user">${msg}</div>`;
  inp.value='';

  try{
    // USING CORS PROXY BECAUSE GITHUB PAGES BLOCKS GROQ
    const res = await fetch("https://corsproxy.io/?https://api.groq.com/openai/v1/chat/completions",{
      method:"POST",
      headers:{"Authorization":`Bearer ${GROQ_API_KEY}`,"Content-Type":"application/json"},
      body:JSON.stringify({model:"llama-3.1-8b-instant",messages:[{role:"user",content:msg}]})
    });
    const data = await res.json();
    chat.innerHTML+=`<div class="ai">${data.choices[0].message.content}</div>`;
  }catch(e){
    chat.innerHTML+=`<div class="ai">Error: ${e.message}. Check your API key.</div>`;
  }
  window.scrollTo(0,document.body.scrollHeight);
}
function preset(t){document.getElementById('inp').value=t;send()}
document.getElementById('inp').addEventListener('keypress',e=>{if(e.key==='Enter')send()});

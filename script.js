const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const typing = document.getElementById("typingIndicator");

const darkToggle = document.getElementById("darkModeToggle");
const voiceToggle = document.getElementById("voiceToggle");

let voiceEnabled = false;

darkToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", darkToggle.checked);
});

voiceToggle.addEventListener("change", () => {
  voiceEnabled = voiceToggle.checked;
});

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  typing.classList.remove("hidden");

  const res = await fetch("/.netlify/functions/syllabus-bot", {
    method: "POST",
    body: JSON.stringify({ question: text })
  });

  const data = await res.json();

  typing.classList.add("hidden");

  addMessage(data.answer, "bot");

  if (voiceEnabled) {
    const utter = new SpeechSynthesisUtterance(data.answer);
    speechSynthesis.speak(utter);
  }
}

const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const typing = document.getElementById("typingIndicator");

const darkToggle = document.getElementById("darkModeToggle");
const voiceToggle = document.getElementById("voiceToggle");

let voiceEnabled = false;

// ------------------------------
// DARK MODE
// ------------------------------
darkToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", darkToggle.checked);
});

// ------------------------------
// VOICE MODE
// ------------------------------
voiceToggle.addEventListener("change", () => {
  voiceEnabled = voiceToggle.checked;
});

// ------------------------------
// SEND MESSAGE EVENTS
// ------------------------------
sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

// ------------------------------
// ADD MESSAGE TO CHAT
// ------------------------------
function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// ------------------------------
// SEND MESSAGE TO BACKEND
// ------------------------------
async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  typing.classList.remove("hidden");

  let data;

  try {
    const res = await fetch("/.netlify/functions/syllabus-bot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: text })
    });

    data = await res.json();
  } catch (err) {
    typing.classList.add("hidden");
    addMessage("Error: Could not reach server.", "bot");
    return;
  }

  typing.classList.add("hidden");

  if (!data || !data.answer) {
    addMessage("Error: No answer returned from server.", "bot");
    return;
  }

  addMessage(data.answer, "bot");

  if (voiceEnabled) {
    const utter = new SpeechSynthesisUtterance(data.answer);
    speechSynthesis.speak(utter);
  }
}

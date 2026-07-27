// ---------------- GLOBAL VARIABLES --------------
let mediaRecorder;
let audioChunks = [];
let stream;
let voices = [];

// Load voices (important for speech)
speechSynthesis.onvoiceschanged = () => {
    voices = speechSynthesis.getVoices();
};

//-------------------------- clock and days --------------------------------
function week_days() {
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'short' });

    document.getElementById('days').textContent = day;
}
document.addEventListener('DOMContentLoaded', () => {
    week_days();
    setInterval(week_days, 60000);
});
// This function contains the logic to update the clock
function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();

    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');

    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// This event triggers as soon as the HTML is loaded and parsed
document.addEventListener('DOMContentLoaded', () => {
    updateClock();

    setInterval(updateClock, 1000);
});

//conversation initiation
async function start_talking() {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            audioChunks.push(event.data);
        }
    };

    mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });

        await sendToDjango(audioBlob);

        stream.getTracks().forEach(track => track.stop());
    };

    mediaRecorder.start();
}

function stop_talking() {
    if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
    }
}

async function sendToDjango(blob) {
    const formData = new FormData();
    formData.append("audio", blob, "voice.webm");

    const response = await fetch("/api/talk/", {
        method: "POST",
        body: formData
    });

    return await response.json();
}

//------------------AI Speaker--------------------
const data = await Response.json();
const aitext = data.response;
const speech = new SpeechSynthesisUtterance(aitext);
window.speechSynthesis.speak(speech);


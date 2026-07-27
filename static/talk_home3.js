// Wait until the page fully loads
document.addEventListener("DOMContentLoaded", () => {

    // ---------------- DROPDOWN MENU ----------------
const btn = document.querySelector(".menu-btn");
const dropdown = document.getElementById("dropdownMenu");
const items = document.querySelectorAll("#dropdownMenu a");

// animation delay
items.forEach((item, index) => {
    item.style.transitionDelay = (index * 0.1) + "s";
});

// toggle dropdown
btn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("active");
});

// close when clicking outside
document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target) && !btn.contains(event.target)) {
        dropdown.classList.remove("active");
    }
});
    // ---------------- DELETE MODAL ----------------
    const deleteModal = document.getElementById("deleteModal");

    window.showDeleteConfirm = function () {
        if (deleteModal) {
            deleteModal.style.display = "flex";
        }
    };

    window.closeDelete = function () {
        if (deleteModal) {
            deleteModal.style.display = "none";
        }
    };

    // ---------------- FLASH MESSAGES ----------------
    setTimeout(() => {
        document.querySelectorAll(".flash").forEach(el => {
            el.style.transition = "opacity 0.5s";
            el.style.opacity = "0";
        });
    }, 3000);


    // ---------------- CHAT BUTTON ----------------
    const chatBtn = document.getElementById("mybutton2");

    if (chatBtn) {
        chatBtn.addEventListener("click", () => {
            window.location.href = "/chat/"; // change if needed
        });
    }
});

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


//-----------------Talk Button ----------------
function start_talking() {
    // intro message
    const speech = new SpeechSynthesisUtterance(
        "Hi, I am Slip talk and I’m listening closely!"
    );

    speech.onend = () => {
        // 2. speech finishes → go to next page
        window.location.href = "/talk/";
    };

    window.speechSynthesis.speak(speech);
}



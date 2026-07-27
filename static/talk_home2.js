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

document.addEventListener("DOMContentLoaded", function () {

// LOGIN AJAX
document.getElementById("loginForm").addEventListener("submit", async function(e){
    e.preventDefault();
    const formData = new FormData(this);
    const response = await fetch("/login", { method: "POST", body: formData });
    const text = await response.text();

    const messageDiv = document.getElementById("message");

    if(text === "Login successful!"){
        messageDiv.innerText = text;
        messageDiv.style.color = "green";  // green text for success
        // Optionally, hide popups
        closePopup();
    } else {
        messageDiv.innerText = text;
        messageDiv.style.color = "red";  // red text for errors
    }
});

// REGISTER AJAX
document.getElementById("registerForm").addEventListener("submit", async function(e){
    e.preventDefault();
    const formData = new FormData(this);
    const response = await fetch("/register", { method: "POST", body: formData });
    const text = await response.text();

    const messageDiv = document.getElementById("message");

    if(text === "Account created successfully!"){
        messageDiv.innerText = text;
        messageDiv.style.color = "green";
        closePopup();
    } else {
        messageDiv.innerText = text;
        messageDiv.style.color = "red";
    }
});
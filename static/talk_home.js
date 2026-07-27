// ---------------- POPUP FUNCTIONS ----------------
function openLogin() {
    document.getElementById("loginPopup").classList.add("active");
}

function openRegister() {
    document.getElementById("registerPopup").classList.add("active");
}

function closePopup() {
    document.getElementById("loginPopup").classList.remove("active");
    document.getElementById("registerPopup").classList.remove("active");
}

// ---------------- MAIN ----------------
document.addEventListener("DOMContentLoaded", () => {

    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");

    const password = document.getElementById("password");
    const confirm = document.getElementById("confirm_password");

    const username = document.querySelector('input[name="reg_username"]');
    const email = document.querySelector('input[name="reg_email"]');

    // -------- BUTTONS --------
    if (loginBtn) loginBtn.addEventListener("click", openLogin);
    if (registerBtn) registerBtn.addEventListener("click", openRegister);

    // -------- CLOSE --------
    document.querySelectorAll(".close").forEach(btn => {
        btn.addEventListener("click", () => {
            btn.closest(".popup").classList.remove("active");
        });
    });

    // -------- SWITCH --------
    document.querySelectorAll(".to-register").forEach(btn => {
        btn.addEventListener("click", () => {
            openRegister();
            document.getElementById("loginPopup").classList.remove("active");
        });
    });

    document.querySelectorAll(".to-login").forEach(btn => {
        btn.addEventListener("click", () => {
            openLogin();
            document.getElementById("registerPopup").classList.remove("active");
        });
    });

    // -------- INPUT VALIDATION (ON BLUR) --------
    if (username) username.addEventListener("blur", () => validateInput(username));
    if (email) email.addEventListener("blur", () => validateInput(email));
    if (confirm) confirm.addEventListener("blur", validateConfirmPassword);

    // -------- PASSWORD RULES (LIVE) --------
    if (password) {
        password.addEventListener("input", checkPasswordRules);

        password.addEventListener("focus", () => {
            document.getElementById("passwordRules").style.display = "block";
        });

        password.addEventListener("blur", () => {
            if (checkPasswordRules()) {
                document.getElementById("passwordRules").style.display = "none";
            }
        });
    }

    if (confirm) {
        confirm.addEventListener("input", checkPasswordRules);
    }

    // -------- FLASH AUTO CLOSE --------
    document.querySelectorAll('.flash').forEach(flash => {
        setTimeout(() => {
            flash.style.opacity = '0';
            setTimeout(() => flash.remove(), 600);
        }, 3000);
    });

    // -------- CLICK OUTSIDE POPUP --------
    document.querySelectorAll(".popup").forEach(popup => {
        popup.addEventListener("click", (e) => {
            if (e.target === popup) closePopup();
        });
    });

});


// ---------------- VALIDATION ----------------
function validateInput(input) {
    const value = input.value.trim();

    if (input.type === "text") {
        input.classList.toggle("valid", value.length >= 3);
    }

    if (input.type === "email") {
        const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        input.classList.toggle("valid", pattern.test(value));
    }
}

function validateConfirmPassword() {
    const password = document.getElementById("password").value;
    const confirmInput = document.getElementById("confirm_password");

    const isValid = confirmInput.value === password && confirmInput.value !== "";
    confirmInput.classList.toggle("valid", isValid);
}
//-------------------------- clock and days --------------------------------
function week_days(){
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday:'short' });

    document.getElementById('days').textContent = day;
}
    document.addEventListener('DOMContentLoaded',  () => {
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

// ---------------- PASSWORD RULES ----------------
function checkPasswordRules() {
    const password = document.getElementById("password").value;
    const confirmValue = document.getElementById("confirm_password").value;

    const confirmInput = document.getElementById("confirm_password");
    const rulesBox = document.getElementById("passwordRules");

    if (!rulesBox) return false;

    // Show / hide rules
    if (password.length > 0 || confirmValue.length > 0) {
        rulesBox.style.display = "block";
    } else {
        rulesBox.style.display = "none";
    }

    // Rules
    const length = password.length >= 8;
    const upper = /[A-Z]/.test(password);
    const lower = /[a-z]/.test(password);
    const number = /[0-9]/.test(password);
    const special = /[\W]/.test(password);
    const confirmed = password === confirmValue && confirmValue !== "";

    // Update UI
    toggleRule("rule-length", length);
    toggleRule("rule-upper", upper);
    toggleRule("rule-lower", lower);
    toggleRule("rule-number", number);
    toggleRule("rule-special", special);
    toggleRule("rule-confirm", confirmed);

    // Confirm checkmark
    if (confirmInput) {
        confirmInput.classList.toggle("valid", confirmed);
    }

    return length && upper && lower && number && special && confirmed;
}


// ---------------- RULE HELPER ----------------
function toggleRule(id, valid) {
    const el = document.getElementById(id);
    if (!el) return;

    el.classList.toggle("valid", valid);
}


// ---------------- FORM SUBMIT ----------------
function validateRegisterForm() {
    if (!checkPasswordRules()) {
        alert("Please fix password requirements!");
        return false;
    }
    return true;
}
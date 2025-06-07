document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById("background");
    const proceedBtn = document.getElementById("proceed-btn");

    video.play();
    disableButton(proceedBtn);

    // Enable Enter button after fade-in
    setTimeout(() => {
        fadeIn(proceedBtn, 1);
        enableButton(proceedBtn);
    }, 1000);

    // Pause video after intro
    setTimeout(() => video.pause(), 7100);
});

let hasIntroPlayed = false;

function introPhase() {
    if (hasIntroPlayed) return;
    hasIntroPlayed = true;

    const video = document.getElementById("background");
    const proceedBtn = document.getElementById("proceed-btn");
    const donateBtn = document.getElementById("donate-btn");
    const ownersBtn = document.getElementById("owners-btn");
    const welcomeContent = document.querySelector(".welcome-content");

    // Play second part of video
    video.currentTime = 7.1;
    video.muted = false;
    video.volume = 0.5;
    video.play();
    video.style.transition = "opacity 5s ease";
    video.style.opacity = "0.25";

    // Fade out & hide proceed button
    disableButton(proceedBtn);
    fadeOut(proceedBtn, 1);

    setTimeout(() => {
        proceedBtn.style.display = "none";

        // Show donate button
        donateBtn.style.display = "inline-block";
        donateBtn.offsetWidth;
        fadeIn(donateBtn, 5);
        donateBtn.style.cursor = "default";
        donateBtn.disabled = true;

        // Show owners button
        ownersBtn.style.display = "inline-block";
        ownersBtn.offsetWidth;
        fadeIn(ownersBtn, 5);
        ownersBtn.style.cursor = "default";
        ownersBtn.disabled = true;

        // Enable both buttons
        setTimeout(() => {
            enableButton(donateBtn);
            enableButton(ownersBtn);
        }, 4000);
    }, 1000);

    // Fade in content container styling
    welcomeContent.style.opacity = "1";
    welcomeContent.style.borderRadius = "30px";
    welcomeContent.style.borderColor = "rgba(255, 255, 255, 0.1)";
    welcomeContent.style.backdropFilter = "blur(10px)";
}

function donateBtn() {
    window.open("https://cash.app/Jayway2saucyy", "_blank");
}

function ownersPage() {
    window.open("https://invsbl.vip/yourstruly", "_blank");
}

// --- Helper Functions ---
function fadeIn(el, duration = 1) {
    el.style.transition = `opacity ${duration}s ease`;
    el.style.opacity = "1";
}

function fadeOut(el, duration = 1) {
    el.style.transition = `opacity ${duration}s ease`;
    el.style.opacity = "0";
}

function disableButton(btn) {
    btn.disabled = true;
    btn.style.cursor = "default";
}

function enableButton(btn) {
    btn.disabled = false;
    btn.style.cursor = "pointer";
}

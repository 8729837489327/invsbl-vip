document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById("background");
    const proceedBtn = document.getElementById("proceed-btn");

    video.play();
    video.muted = false;
    disableButton(proceedBtn);

    // Enable Enter button after fade-in
    setTimeout(() => {
        fadeIn(proceedBtn, 3.650);
        setTimeout(() => {
            enableButton(proceedBtn);
        }, 2650);
    }, 1000);

    // Pause video after intro
    setTimeout(() => video.pause(), 3650);
});

let hasIntroPlayed = false;

function introPhase() {
    if (hasIntroPlayed) return;
    hasIntroPlayed = true;

    const video = document.getElementById("background");
    const title = document.getElementById("title");
    const proceedBtn = document.getElementById("proceed-btn");
    const donateBtn = document.getElementById("donate-btn");
    const ownersBtn = document.getElementById("owners-btn");
    const welcomeContent = document.querySelector(".welcome-content");

    fadeOut(title, 1)
    setTimeout(() => {
        title.style.fontFamily = "werebeast";
        fadeIn(title, 1);
    }, 1000);

    // Play second part of video
    video.currentTime = 3.650;
    video.muted = false;
    video.volume = 0.5;
    video.play();
    video.style.transition = "opacity 5s ease-in-out";
    video.style.opacity = "0.5";

    // Fade out & hide proceed button
    disableButton(proceedBtn);
    fadeOut(proceedBtn, 1);

    setTimeout(() => {
        welcomeContent.style.opacity = "1";
        welcomeContent.style.borderRadius = "30px";
        welcomeContent.style.borderColor = "rgba(255, 255, 255, 0.1)";
        welcomeContent.style.backdropFilter = "blur(10px)";

        proceedBtn.style.display = "none";

        // Show donate button
        donateBtn.style.display = "inline-block";
        donateBtn.offsetWidth; // trigger reflow
        fadeIn(donateBtn, 2.5);
        donateBtn.style.cursor = "default";
        donateBtn.disabled = true;

        // Show owners button
        ownersBtn.style.display = "inline-block";
        ownersBtn.offsetWidth;
        fadeIn(ownersBtn, 2.5);
        ownersBtn.style.cursor = "default";
        ownersBtn.disabled = true;

        // Enable both buttons after fade
        setTimeout(() => {
            enableButton(donateBtn);
            enableButton(ownersBtn);
        }, 2500);
    }, 1000);
}

function donateBtn() {
    window.open("https://cash.app/Jayway2saucyy", "_blank");
}

function ownersPage() {
    window.open("https://invsbl.vip/yourstruly", "_blank");
}

// --- Helper Functions ---
function fadeIn(el, duration = 1) {
    el.style.transition = `opacity ${duration}s ease-in`;
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
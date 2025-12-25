document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("background");
  const music = document.getElementById("background-music");
  const container = document.getElementById("container");
  const overlay = document.getElementById("clickOverlay");
  const muteBtn = document.getElementById("mute-btn");

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  overlay.addEventListener("click", () => {
    video.muted = false;
    video.volume = 1;
    video.play().catch(() => {});

    music.muted = false;
    music.volume = 0;
    music.play().catch(() => {});

    video.style.filter = "none";
    video.style.opacity = "1";
    overlay.style.display = "none";

    container.classList.add("visible");

    if (!isMobile) {
      muteBtn.classList.add("visible");
    }
  });

  muteBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? "🔇" : "🔊";
  });
});

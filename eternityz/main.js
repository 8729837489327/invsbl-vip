document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("background");
  const container = document.getElementById("container");
  const volumeControl = document.getElementById("volume-control");
  const overlay = document.getElementById("clickOverlay");

  // Detect mobile device
  const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent);
  if (isMobile) {
    volumeControl.style.opacity = "0";
  }

  overlay.addEventListener("click", () => {
    video.muted = false;
    video.play();
    video.style.filter = "none";
    video.style.opacity = "1";
    overlay.style.display = "none";

    container.classList.add("visible");

    // Only show volume control if not on mobile
    if (!isMobile) {
      volumeControl.classList.add("visible");
    }
  });

  document.getElementById("volume-slider").addEventListener("input", (event) => {
    video.volume = event.target.value;
  });
});

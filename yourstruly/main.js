document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("background");
  const container = document.getElementById("container");
  const volumeControl = document.getElementById("volume-control");
  const overlay = document.getElementById("clickOverlay");

  overlay.addEventListener("click", () => {
    video.muted = false;
    video.play();
    video.style.filter = "none";

    video.style.opacity = "1";

    overlay.style.display = "none";

    // Fade in container and volume control by adding "visible" class
    container.classList.add("visible");
    volumeControl.classList.add("visible");
  });

  document
    .getElementById("volume-slider")
    .addEventListener("input", (event) => {
      video.volume = event.target.value;
    });
});

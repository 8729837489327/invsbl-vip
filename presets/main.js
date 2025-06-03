document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("background");
    const container = document.getElementById("container");
    const volumeController = document.getElementById("")
    const overlay = document.getElementById("clickOverlay");

    overlay.addEventListener("click", () => {
        video.muted = false;
        video.play();
        video.style.filter = "none";

        overlay.style.display = "none";
    })

    document.getElementById("volume-slider").addEventListener("input", (event) => {
        video.volume = event.target.value;
    })
})
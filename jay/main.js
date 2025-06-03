document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("plr_video");
    const overlay = document.getElementById("clickOverlay");
    const banner = document.querySelector(".plr_banner");
    const info = document.querySelector(".plr_info");
    const volumeControl = document.querySelector(".volume-control");

    overlay.addEventListener("click", () => {
        video.muted = false;
        video.play();
        video.style.filter = "none";
        banner.style.filter = "none";
        overlay.style.display = "none";

        banner.style.display = "block";
        info.style.display = "flex";
        volumeControl.style.display = "flex";

        setTimeout(() => {
            volumeControl.style.opacity = "1";
            banner.style.opacity = "1";
            info.style.opacity = "1";
        }, 100);
    });

    document.getElementById("volume-slider").addEventListener("input", (event) => {
        video.volume = event.target.value;
    });
});
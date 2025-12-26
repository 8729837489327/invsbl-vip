document.addEventListener("DOMContentLoaded", async () => {
  const slug = window.location.pathname.slice(1) || "index";
  const jsonFile = `/pages/${slug}.json`;

  let data;
  try {
    const res = await fetch(jsonFile);
    if (!res.ok) throw new Error("JSON not found");
    data = await res.json();

    // Set page title dynamically
    document.title = `invsbl.vip | ${slug}`;

  } catch {
    console.error("Profile JSON not found:", jsonFile);
    window.location.href = "/";
    return;
  }

  // Load CSS
  const layoutCss = document.getElementById("layout-css");
  if (layoutCss) layoutCss.href = `/css/layout${data.layout}.css`;

  // Load layout HTML
  try {
    const layoutHtml = await fetch(`/layouts/layout${data.layout}.html`).then(r => r.text());
    const layoutRoot = document.getElementById("layout-root");
    if (!layoutRoot) throw new Error("layout-root not found in main HTML");
    layoutRoot.innerHTML = layoutHtml;

    // Profile elements
    const usernameEl = document.getElementById("username");
    const pfpEl = document.getElementById("pfp");
    const bannerEl = document.getElementById("banner");
    const socialsDiv = document.getElementById("socials");
    const containerEl = document.querySelector(".container");

    // Username
    if (usernameEl) {
      usernameEl.textContent = data.username || "";
      if (data.usernameColor) usernameEl.style.color = data.usernameColor;
    }

    // Profile picture
    if (pfpEl) {
      if (data.pfp) {
        pfpEl.src = data.pfp;
        pfpEl.style.display = "block";
      } else {
        pfpEl.style.display = "none";
      }
    }

    // Banner
    if (bannerEl) {
      if (data.banner) {
        bannerEl.src = data.banner;
        bannerEl.style.display = "block";
      } else {
        bannerEl.style.display = "none";
      }
    }

    // Container background & blur
    if (containerEl) {
      if (data.containerColor) containerEl.style.background = data.containerColor;
      if (data.containerBlur) containerEl.style.backdropFilter = `blur(${data.containerBlur})`;
    }

    // Socials
    if (socialsDiv) {
      socialsDiv.innerHTML = "";
      data.socials.forEach(s => {
        const a = document.createElement("a");
        a.href = s.url;
        a.target = "_blank";
        a.classList.add("social-btn");
        if (s.tooltip) a.dataset.tooltip = s.tooltip;

        const img = document.createElement("img");
        img.src = s.icon;
        a.appendChild(img);

        socialsDiv.appendChild(a);
      });
    }

  } catch (err) {
    console.error("Error loading layout:", err);
    return;
  }

  // Video & Music
  const video = document.getElementById("background");
  const music = document.getElementById("background-music");

  if (video) {
    const videoSrc = document.getElementById("bg-video-src");
    if (videoSrc) {
      videoSrc.src = data.video;
      video.load();
      video.volume = data.videoVolume ?? 0.5;
      video.muted = data.videoMuted ?? false;
    }
  }

  if (music) {
    const musicSrc = document.getElementById("bg-music-src");
    if (musicSrc) {
      musicSrc.src = data.music;
      music.load();
      music.volume = data.musicVolume ?? 0.5;
      music.muted = data.musicMuted ?? true;
    }
  }

  // Overlay click
  const overlay = document.getElementById("clickOverlay");
  const muteBtn = document.getElementById("mute-btn");
  const container = document.querySelector(".container");
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (overlay) {
    overlay.addEventListener("click", () => {
      if (video) video.play().catch(() => {});
      if (music) music.play().catch(() => {});

      if (video) {
        video.style.filter = "none";
        video.style.opacity = "1";
      }
      overlay.style.display = "none";

      if (container) container.classList.add("visible");
      if (!isMobile && muteBtn) muteBtn.classList.add("visible");
    });
  }

  // Mute button toggles both
  if (muteBtn) {
    muteBtn.addEventListener("click", () => {
      if (!video || !music) return;
      const muted = !video.muted;
      video.muted = muted;
      music.muted = muted;
      muteBtn.textContent = muted ? "🔇" : "🔊";
    });
  }
});

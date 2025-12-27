document.addEventListener("DOMContentLoaded", async () => {
  // Get the "slug" from the URL path
  let slug = window.location.pathname.replace(/^\/+|\/+$/g, "");

  // If root, redirect to a default page or show welcome
  if (!slug) return;

  // Fetch the corresponding JSON
  const res = await fetch(`/pages/${slug}.json`);
  if (!res.ok) return (window.location.href = "/"); // fallback

  const data = await res.json();

  // Set page title
  document.title = `invsbl.vip | ${data.username}`;

  // Load layout CSS
  const layoutCss = document.getElementById("layout-css");
  layoutCss.href = `/css/layout${data.layout}.css`;

  // Load layout HTML
  const layoutHtml = await fetch(`/layouts/layout${data.layout}.html`).then(r => r.text());
  document.getElementById("layout-root").innerHTML = layoutHtml;

  // Populate page
  if (document.getElementById("username")) {
    document.getElementById("username").textContent = data.username;
    if (data.usernameColor) document.getElementById("username").style.color = data.usernameColor;
  }

  if (document.getElementById("pfp") && data.pfp) document.getElementById("pfp").src = data.pfp;
  if (document.getElementById("banner") && data.banner) document.getElementById("banner").src = data.banner;

  const socialsDiv = document.getElementById("socials");
  socialsDiv.innerHTML = "";
  data.socials.forEach(s => {
    const a = document.createElement("a");
    a.href = s.url;
    a.target = "_blank";
    a.className = "social-btn";
    if (s.tooltip) a.dataset.tooltip = s.tooltip;

    const img = document.createElement("img");
    img.src = s.icon;
    a.appendChild(img);
    socialsDiv.appendChild(a);
  });

  // Background video
  const video = document.getElementById("background");
  const vsrc = document.getElementById("bg-video-src");
  if (vsrc) {
    vsrc.src = data.video;
    video.load();
    video.volume = data.videoVolume ?? 0.5;
    video.muted = data.videoMuted ?? false;
  }

  // Background music
  const music = document.getElementById("background-music");
  const msrc = document.getElementById("bg-music-src");
  if (msrc) {
    msrc.src = data.music;
    music.load();
    music.volume = data.musicVolume ?? 0.5;
    music.muted = data.musicMuted ?? true;
  }

  // Click overlay
  const overlay = document.getElementById("clickOverlay");
  if (overlay) {
    overlay.onclick = () => {
      video.play().catch(() => {});
      music.play().catch(() => {});
      document.querySelector(".container").classList.add("visible");
      document.getElementById("mute-btn").classList.add("visible");
      overlay.remove();
    };
  }

  // Mute button
  const muteBtn = document.getElementById("mute-btn");
  if (muteBtn) {
    muteBtn.onclick = () => {
      const muted = !video.muted;
      video.muted = muted;
      music.muted = muted;
      muteBtn.textContent = muted ? "🔇" : "🔊";
    };
  }
});

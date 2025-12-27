document.addEventListener("DOMContentLoaded", async () => {
  let slug = window.location.pathname.replace(/^\/+|\/+$/g, "");
  if (!slug) return (window.location.href = "/");

  const res = await fetch(`/pages/${slug}.json`);
  if (!res.ok) return (window.location.href = "/");

  const data = await res.json();
  document.title = `invsbl.vip | ${data.username}`;

  document.getElementById("layout-css").href = `/css/layout${data.layout}.css`;

  const layout = await fetch(`/layouts/layout${data.layout}.html`).then(r => r.text());
  document.getElementById("layout-root").innerHTML = layout;

  document.getElementById("username").textContent = data.username;
  if (data.usernameColor)
    document.getElementById("username").style.color = data.usernameColor;

  if (data.pfp) document.getElementById("pfp").src = data.pfp;
  if (data.banner) document.getElementById("banner").src = data.banner;

  const socials = document.getElementById("socials");
  socials.innerHTML = "";
  data.socials.forEach(s => {
    const a = document.createElement("a");
    a.href = s.url;
    a.target = "_blank";
    a.className = "social-btn";
    if (s.tooltip) a.dataset.tooltip = s.tooltip;
    const img = document.createElement("img");
    img.src = s.icon;
    a.appendChild(img);
    socials.appendChild(a);
  });

  const video = document.getElementById("background");
  const vsrc = document.getElementById("bg-video-src");
  vsrc.src = data.video;
  video.load();
  video.volume = data.videoVolume ?? 0.5;
  video.muted = data.videoMuted ?? false;

  const music = document.getElementById("background-music");
  const msrc = document.getElementById("bg-music-src");
  msrc.src = data.music;
  music.load();
  music.volume = data.musicVolume ?? 0.5;
  music.muted = data.musicMuted ?? true;

  document.getElementById("clickOverlay").onclick = () => {
    video.play().catch(()=>{});
    music.play().catch(()=>{});
    document.querySelector(".container").classList.add("visible");
    document.getElementById("mute-btn").classList.add("visible");
    document.getElementById("clickOverlay").remove();
  };

  document.getElementById("mute-btn").onclick = () => {
    const muted = !video.muted;
    video.muted = muted;
    music.muted = muted;
  };
});

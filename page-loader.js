document.addEventListener("DOMContentLoaded", async () => {
  const slug =
    window.location.pathname.replace(/^\/+/, "") || "home";

  const jsonFile = `/pages/${slug}.json`;

  let data;
  try {
    const res = await fetch(jsonFile);
    if (!res.ok) throw new Error("JSON not found");
    data = await res.json();

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
  const layoutHtml = await fetch(
    `/layouts/layout${data.layout}.html`
  ).then(r => r.text());

  document.getElementById("layout-root").innerHTML = layoutHtml;

  // Elements
  const usernameEl = document.getElementById("username");
  const pfpEl = document.getElementById("pfp");
  const bannerEl = document.getElementById("banner");
  const socialsDiv = document.getElementById("socials");
  const containerEl = document.querySelector(".container");

  if (usernameEl) {
    usernameEl.textContent = data.username || "";
    if (data.usernameColor)
      usernameEl.style.color = data.usernameColor;
  }

  if (pfpEl) {
    if (data.pfp) {
      pfpEl.src = data.pfp;
      pfpEl.style.display = "block";
    } else {
      pfpEl.style.display = "none";
    }
  }

  if (bannerEl) {
    if (data.banner) {
      bannerEl.src = data.banner;
      bannerEl.style.display = "block";
    } else {
      bannerEl.style.display = "none";
    }
  }

  if (containerEl) {
    if (data.containerColor)
      containerEl.style.background = data.containerColor;
    if (data.containerBlur)
      containerEl.style.backdropFilter = `blur(${data.containerBlur})`;
  }

  if (socialsDiv) {
    socialsDiv.innerHTML = "";
    data.socials.forEach(s => {
      const a = document.createElement("a");
      a.href = s.url;
      a.target = "_blank";
      a.className = "social-btn";

      const img = document.createElement("img");
      img.src = s.icon;
      a.appendChild(img);

      socialsDiv.appendChild(a);
    });
  }

  // Media
  const video = document.getElementById("background");
  const music = document.getElementById("background-music");

  if (video && data.video) {
    document.getElementById("bg-video-src").src = data.video;
    video.load();
    video.volume = data.videoVolume ?? 0.5;
    video.muted = data.videoMuted ?? false;
  }

  if (music && data.music) {
    document.getElementById("bg-music-src").src = data.music;
    music.load();
    music.volume = data.musicVolume ?? 0.5;
    music.muted = data.musicMuted ?? true;
  }
});

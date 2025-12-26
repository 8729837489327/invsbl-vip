// Get page slug from URL
const slug = window.location.pathname.replace(/^\/+/, "");

if (!slug || slug === "page.html") {
  window.location.href = "/";
}

// Load JSON
fetch(`/pages/${slug}.json`)
  .then(res => {
    if (!res.ok) throw new Error("not found");
    return res.json();
  })
  .then(data => initPage(data))
  .catch(() => window.location.href = "/");

function initPage(data) {
  // Set background video
  const video = document.getElementById("bg-video-src");
  video.src = data.video;
  document.getElementById("background").load();

  // Load layout HTML
  fetch(`/layouts/layout${data.layout}.html`)
    .then(r => r.text())
    .then(html => {
      const root = document.getElementById("layout-root");
      root.innerHTML = html;

      // Fill data
      document.getElementById("username").textContent = data.username;
      document.getElementById("pfp").src = data.pfp;
      document.getElementById("banner").src = data.banner;

      // Load socials
      const socialsDiv = document.getElementById("socials");
      socialsDiv.innerHTML = "";
      data.socials.forEach(s => {
        const a = document.createElement("a");
        a.href = s.url;
        a.target = "_blank";

        const img = document.createElement("img");
        img.src = s.icon;

        a.appendChild(img);
        socialsDiv.appendChild(a);
      });
    });
}

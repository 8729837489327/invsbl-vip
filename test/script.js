const products = {
  valorant: [
    { name: "Valorant Full", price: "€4.99", img: "games/val.jpg", url: "games" },
    { name: "Valorant VIP", price: "€9.99", img: "games/val.jpg", url: "valorant-vip.html" }
  ],
  roblox: [
    { name: "Roblox Internal", price: "€5.49", img: "games/rbx.jpg", url: "roblox-internal.html" },
    { name: "Roblox External", price: "€7.99", img: "games/rbx.jpg", url: "roblox-external.html" }
  ],
  fortnite: [
    { name: "Skin Service", price: "€12.00", img: "https://via.placeholder.com/250x300?text=Skins", url: "fortnite-skin-service.html" },
    { name: "Fortnite Accounts", price: "€15.00", img: "https://via.placeholder.com/250x300?text=Accounts", url: "fortnite-accounts.html" }
  ],
  rainbowsixsiege: [
    { name: "Ring 1", price: "too much", img: "games/r6.jpg", url: "r6-ring1.html" },
    { name: "Perc", price: "not enough", img: "games/r6.jpg", url: "r6-perc.html" }
  ],
};

function showCategory(category) {
  document.getElementById("category-title").innerText =
    category === "valorant" ? "Valorant" :
    category === "roblox" ? "Roblox" :
    category === "fortnite" ? "Fortnite" :
    category === "rainbowsixsiege" ? "Rainbow Six Siege" :
    "Products";

  const container = document.getElementById("product-container");
  container.innerHTML = "";

  products[category].forEach(product => {
    const card = document.createElement("div");
    card.className = "product";

    card.innerHTML = `
      <h3 class="product-name">${product.name}</h3>
      <img src="${product.img}" alt="${product.name}"/>
      <div class="product-footer">
        <button class="buy-now-btn">🛒 Buy Now</button>
        <div class="price">Starting at ${product.price}</div>
      </div>
    `;

    container.appendChild(card);

    // Add click listener to button to navigate to product page
    const buyBtn = card.querySelector('.buy-now-btn');
    buyBtn.addEventListener('click', () => {
      window.location.href = product.url;
    });
  });
}

// Load default category
showCategory('valorant');

// --- Snowfall effect with natural drifting ---
function createSnowflake() {
  const snowContainer = document.getElementById('snow-container');
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');

  const size = Math.random() * 7 + 5;
  snowflake.style.width = size + 'px';
  snowflake.style.height = size + 'px';

  const startX = Math.random() * window.innerWidth;
  snowflake.style.left = startX + 'px';

  const fallDuration = Math.random() * 8 + 7;
  const driftAmplitude = Math.random() * 30 + 20;

  const animationName = `fallDrift${Date.now()}${Math.floor(Math.random()*1000)}`;

  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = `
  @keyframes ${animationName} {
    0% {
      transform: translateX(0px) translateY(0);
      opacity: 0.8;
    }
    25% {
      transform: translateX(${driftAmplitude}px) translateY(25vh);
      opacity: 0.8;
    }
    50% {
      transform: translateX(0px) translateY(50vh);
      opacity: 0.6;
    }
    75% {
      transform: translateX(${-driftAmplitude}px) translateY(75vh);
      opacity: 0.4;
    }
    100% {
      transform: translateX(0px) translateY(100vh);
      opacity: 0;
    }
  }`;
  document.head.appendChild(styleSheet);

  snowflake.style.animation = `${animationName} ${fallDuration}s linear forwards`;

  snowContainer.appendChild(snowflake);

  snowflake.addEventListener('animationend', () => {
    snowflake.remove();
    styleSheet.remove();
  });
}

setInterval(createSnowflake, 150);

// --- Random music cycling ---
const audio = document.getElementById('music');
const musicList = [
  "regretful - leverfall (slowed  reverb).mp3",
  "restless dreams - dxnrm.mp3"
];

let currentTrack = null;

function getRandomTrack(exclude) {
  const choices = musicList.filter(track => track !== exclude);
  return choices[Math.floor(Math.random() * choices.length)];
}

function playRandomTrack() {
  const newTrack = getRandomTrack(currentTrack);
  currentTrack = newTrack;
  audio.src = newTrack;
  audio.load();
  audio.volume = 0;
  audio.play();
}

audio.addEventListener('ended', playRandomTrack);

window.addEventListener('DOMContentLoaded', playRandomTrack);

const header = document.querySelector(".main-header");
const logo = document.getElementById("logoBox");

function isDesktop() {
  return window.matchMedia("(min-width: 1024px)").matches;
}

function setupHeaderBehavior() {

  // Önce tüm eski eventleri sıfırla
  header.classList.remove("active");
  logo.onclick = null;

  if (!isDesktop()) {
    // 📱 MOBİL → click ile aç/kapa
    logo.onclick = (e) => {
      e.stopPropagation();
      header.classList.toggle("active");
    };

    // dışarı tıklayınca kapansın
    document.onclick = () => {
      header.classList.remove("active");
    };
  } else {
    // 🖥️ DESKTOP → sadece hover
    document.onclick = null;
  }
}

// İlk yüklemede
setupHeaderBehavior();

// Resize olursa tekrar ayarla
window.addEventListener("resize", setupHeaderBehavior);


/* ===============================
   HEADER SHRINK
================================ */
function initHeaderShrink() {
  const header = document.querySelector(".main-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    header.classList.toggle("shrink", window.scrollY > 50);
  });
}

/* ===============================
   TEMALAR
================================ */
const themes = [
  { name: "dark", bg: "rgb(0, 0, 0)", nav: "#fff", glow: "#fff" },
  { name: "gray", bg: "rgb(130, 130, 130)", nav: "#fff", glow: "#fff" },
  { name: "light", bg: "rgb(250, 250, 250)", nav: "#000", glow: "#000" }
];

function changeTheme() {
  const currentBg = getComputedStyle(document.body).backgroundColor;
  const index = themes.findIndex(t => t.bg === currentBg);
  const next = themes[(index + 1) % themes.length];

  document.body.style.backgroundColor = next.bg;

  document.querySelectorAll(".nav").forEach(el => {
    el.style.color = next.nav;
  });

  setLogoShadow(next.glow);

  localStorage.setItem("theme", next.name);
}

function loadSavedTheme() {
  const saved = localStorage.getItem("theme");
  if (!saved) return;

  const theme = themes.find(t => t.name === saved);
  if (!theme) return;

  document.body.style.backgroundColor = theme.bg;

  document.querySelectorAll(".nav").forEach(el => {
    el.style.color = theme.nav;
  });

  setLogoShadow(theme.glow);
}

function setLogoShadow(color) {
  document.documentElement.style.setProperty(
    "--logo-shadow",
    `0 0 15px ${color}`
  );
}

/* ===============================
   INIT
================================ */
(function init() {
  initHeaderShrink();
  loadSavedTheme();

  const logo = document.getElementById("logoBox");
  const themeBtn = document.getElementById("themeBtn");
  if (getComputedStyle(themeBtn).display !== "none") {
    themeBtn.addEventListener("click", changeTheme);
  } else {
    logo.addEventListener("click", changeTheme);
  }
})();

const nav = document.querySelector(".header-nav-bar");

header.addEventListener("transitionend", (e) => {
  // Sadece width animasyonu bittiğinde çalışsın
  if (e.propertyName === "width") {
    header.classList.add("nav-ready");
  }
});

// Hover çıkınca tekrar kilitle
header.addEventListener("mouseleave", () => {
  header.classList.remove("nav-ready");
});


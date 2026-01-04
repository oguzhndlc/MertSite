// ===============================
// LAYOUT YÜKLEME
// ===============================
fetch("/admin_panel/admin_layout/_layout.html")
  .then(res => res.text())
  .then(html => {
    // Layout'u sayfaya bas
    document.getElementById("layout").innerHTML = html;

    // Sayfanın kendi içeriğini layout içine taşı
    const content = document.getElementById("content");
    const target = document.getElementById("pageContent");

    if (content && target) {
      target.appendChild(content);
    }

    // 🔥 Aktif sidebar linki ayarla
    setActiveSidebar();

    // 🔥 Title wave animasyonunu başlat
    initWaveText();
  })
  .catch(err => {
    console.error("Layout yüklenemedi:", err);
  });


// ===============================
// AKTİF SIDEBAR
// ===============================
function setActiveSidebar() {
  const currentPage = window.location.pathname.split("/").pop();

  document.querySelectorAll(".navigation a").forEach(link => {
    const linkPage = link.getAttribute("href")?.split("/").pop();

    if (currentPage === linkPage) {
      link.classList.add("active");
    }
  });
}


// ===============================
// TITLE WAVE ANİMASYONU
// ===============================
function initWaveText() {
  document.querySelectorAll(".wave-text").forEach(el => {
    const text = el.innerText;
    el.innerHTML = "";

    [...text].forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.animationDelay = `${i * 0.1}s`;
      el.appendChild(span);
    });
  });
}

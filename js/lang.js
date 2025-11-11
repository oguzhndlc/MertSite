// lang.js

/**
 * JSON dosyasından dili yükle ve sayfadaki metinleri güncelle
 * @param {string} lang - "tr" veya "en"
 */
function loadLanguage(lang) {
  fetch(`js/${lang}.json`)
    .then(response => response.json())
    .then(data => {
      document.getElementById("title").textContent = data.title;
      document.getElementById("header-nav-1").textContent = data["header-nav-1"];
      document.getElementById("header-nav-2").textContent = data["header-nav-2"];
      document.getElementById("header-nav-3").textContent = data["header-nav-3"];
      document.getElementById("header-nav-4").textContent = data["header-nav-4"];
      document.getElementById("header-nav-5").textContent = data["header-nav-5"];
      document.getElementById("header-btn-1").textContent = data["header-btn-1"];
      document.getElementById("header-btn-2").textContent = data["header-btn-2"];
      document.getElementById("header-btn-2-drop-1").textContent = data["header-btn-2-drop-1"];
      document.getElementById("header-btn-2-drop-2").textContent = data["header-btn-2-drop-2"];

      // Typewriter animasyonu için
      startTypeWriter(data["body-animate-text"]);

      // Dili kaydet
      localStorage.setItem("lang", lang);
    })
    .catch(err => console.error("Dil dosyası yüklenemedi:", err));
}

/**
 * Butonlarla dil değiştir
 */
function changeLang(lang) {
  loadLanguage(lang);
}

// Sayfa açıldığında mevcut dili uygula
let currentLang = localStorage.getItem("lang") || "tr";
loadLanguage(currentLang);

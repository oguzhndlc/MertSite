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

      const lang_cont = ["header-nav-1", "header-nav-2", "header-nav-3",
        "header-nav-4","header-nav-5","header-btn-1","header-btn-2",
        "header-btn-2-drop-1","header-btn-2-drop-2","galery-card-1-title",
        "galery-card-1-examp","galery-card-1-btn"
      ];

      for (let i = 0; i < lang_cont.length; i++) {
        document.getElementById(lang_cont[i]).textContent = data[lang_cont[i]];;
      }
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

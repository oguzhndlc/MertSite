// lang.js

/**
 * JSON dosyasından dili yükle ve sayfadaki metinleri güncelle
 * @param {string} lang - "tr" veya "en"
 */
async function loadLanguage(lang) {
  try {
    const response = await fetch(`js/${lang}.json`);
    if (!response.ok) throw new Error(`Dil dosyası bulunamadı! HTTP status: ${response.status}`);

    const data = await response.json();

    // Başlık
    const titleEl = document.getElementById("title");
    if (titleEl) titleEl.textContent = data.title;

    // Güncellenecek içerik ID'leri
    const lang_cont = [
      "header-nav-1", "header-nav-2", "header-nav-3",
      "header-nav-4","header-nav-5","header-btn-1","header-btn-2",
      "header-btn-2-drop-1","header-btn-2-drop-2","galery-card-1-title",
      "galery-card-1-examp","galery-card-1-btn","back-button"
    ];

    lang_cont.forEach(id => {
      const el = document.getElementById(id);
      if (el && data[id] !== undefined) {
        el.textContent = data[id];
      }
    });

    // Typewriter animasyonu için
    if (typeof startTypeWriter === "function" && data["body-animate-text"]) {
      startTypeWriter(data["body-animate-text"]);
    }

    // Dili kaydet
    localStorage.setItem("lang", lang);

  } catch (err) {
    console.error("Dil dosyası yüklenemedi:", err);
  }
}

/**
 * Butonlarla dil değiştir
 */
function changeLang(lang) {
  loadLanguage(lang);
}

// Sayfa açıldığında mevcut dili uygula
const currentLang = localStorage.getItem("lang") || "tr";
loadLanguage(currentLang);

// lang.js

/**
 * JSON dosyasından dili yükle ve sayfadaki metinleri güncelle
 * @param {string} lang - "tr", "en" veya "es"
 */
async function loadLanguage(lang) {
  try {
    const response = await fetch(`js/${lang}.json`);
    if (!response.ok)
      throw new Error(`Dil dosyası bulunamadı! HTTP status: ${response.status}`);

    const data = await response.json();

    // Başlık
    const titleEl = document.getElementById("title");
    if (titleEl) titleEl.textContent = data.title;

    // Güncellenecek içerik ID'leri
    const lang_cont = [
      "header-nav-1", "header-nav-2", "header-nav-3",
      "header-nav-4", "header-nav-5",
      "header-btn-1", "header-btn-2",
      "header-btn-2-drop-1", "header-btn-2-drop-2", "header-btn-2-drop-3",
      "galery-card-1-title", "galery-card-1-examp",
      "galery-card-1-btn", "back-button"
    ];

    // Sayfada varsa ilgili metinleri güncelle
    lang_cont.forEach(id => {
      const el = document.getElementById(id);
      if (el && data[id] !== undefined) el.textContent = data[id];
    });

    // Typewriter animasyonu varsa ve hedef element DOM'da mevcutsa başlat
    const animateText = document.getElementById("body-animate-text");
    if (typeof startTypeWriter === "function" && animateText && data["body-animate-text"]) {
      startTypeWriter(data["body-animate-text"]);
    }

    // Dili kaydet ve consola yaz
    localStorage.setItem("lang", lang);
    console.log(`✅ Dil "${lang}" olarak yüklendi ve localStorage’a kaydedildi.`);

  } catch (err) {
    console.error("❌ Dil dosyası yüklenemedi:", err);
  }
}

/**
 * Butonlarla dil değiştir
 */
function changeLang(lang) {
  loadLanguage(lang);
}

/**
 * Sayfa açıldığında mevcut dili uygula
 * (Header dinamik olarak yüklense bile beklenir)
 */
document.addEventListener("DOMContentLoaded", () => {
  const currentLang = localStorage.getItem("lang") || "tr";

  // Header dinamik olarak yüklenmişse bekle
  const headerPlaceholder = document.getElementById("header-placeholder");
  if (headerPlaceholder) {
    const observer = new MutationObserver(() => {
      if (headerPlaceholder.innerHTML.trim() !== "") {
        loadLanguage(currentLang);
        observer.disconnect(); // header geldi, izlemeyi durdur
      }
    });
    observer.observe(headerPlaceholder, { childList: true });
  } else {
    // Statik header varsa doğrudan uygula
    loadLanguage(currentLang);
  }

  console.log(`🌐 Sayfa açıldı — mevcut dil: "${currentLang}"`);
});

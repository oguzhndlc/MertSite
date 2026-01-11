// script.js

/**
 * 🌈 Arka plan rengini değiştir ve localStorage'a kaydet
 */



function adminLogin() {
  // Eğer daha önce hiç giriş yapılmadıysa varsayılan false ata
  if (!sessionStorage.getItem("loggedIn")) {
    sessionStorage.setItem("loggedIn", "false");
  }

  const loggedIn = sessionStorage.getItem("loggedIn");
  console.log("Giriş durumu: " + loggedIn);

  if (loggedIn === "true") {
    window.location.href = "/admin_panel/pages/dashboard.html";
  } else {
    window.location.href = "/pages/login.html";
  }
}


// Sayfa açıldığında arka plan rengini uygula
window.addEventListener("load", () => {
  const kayitliRenk = localStorage.getItem("arkaplanRengi");
  if (kayitliRenk) document.body.style.backgroundColor = kayitliRenk;
});

/**
 * 💬 Uyarı örneği
 */
function iletiver() {
  alert("Mertim sınavların inşallah GÜZEL GEÇERRRRR 💪");
}

/**
 * 🖤 Kalp animasyonları (örnek)
 */
function baslatAnimasyon() {
  const sol = document.getElementById("resimSol");
  const sag = document.getElementById("resimSag");

  if (!sol || !sag) return;

  setTimeout(() => sol.classList.add("goster"), 100);
  setTimeout(() => sag.classList.add("goster"), 500);

  setTimeout(() => {
    sol.remove();
    sag.remove();
  }, 2500);
}

/* ===============================
   📝 Typewriter Animasyonu
================================*/
let index = 0;
let metin = "";

/**
 * Harf harf yazı animasyonu
 */
function typeWriter() {
  const yaziDiv = document.getElementById("body-animate-text");
  if (!yaziDiv) return; // Sayfada bu alan yoksa hata verme

  if (index < metin.length) {
    yaziDiv.textContent += metin.charAt(index);
    index++;
    setTimeout(typeWriter, 200);
  }
}

/**
 * Yeni metinle yazı animasyonunu başlat
 * @param {string} newText
 */
function startTypeWriter(newText) {
  const yaziDiv = document.getElementById("body-animate-text");
  if (!yaziDiv) {
    console.warn("⚠️ startTypeWriter: 'body-animate-text' elementi bulunamadı.");
    return;
  }

  metin = newText;
  index = 0;
  yaziDiv.textContent = "";
  typeWriter();
}


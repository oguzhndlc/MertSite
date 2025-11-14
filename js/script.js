// script.js

/**
 * 🌈 Arka plan rengini değiştir ve localStorage'a kaydet
 */
let btnopened = false;
let linker;

function Mertim() {
  let renk = window.getComputedStyle(document.body).backgroundColor;
  let yeniRenk;

  if (renk === "rgb(169, 169, 202)") {
    yeniRenk = "rgb(143, 216, 165)";
  } else if (renk === "rgb(143, 216, 165)") {
    yeniRenk = "rgb(238, 218, 131)";
  } else {
    yeniRenk = "rgb(169, 169, 202)";
  }

  document.body.style.backgroundColor = yeniRenk;
  localStorage.setItem("arkaplanRengi", yeniRenk);

  

  if(yeniRenk === "rgb(143, 216, 165)" && !btnopened){
    linker = document.createElement("a");
    linker.onclick=adminLogin;
    linker.textContent = "Admin";
    linker.className="pagectrl";
    document.getElementById("pagess").appendChild(linker);
    console.log("Button Açıldı. Tebrikler!!!");
    btnopened=true;
  }else if(btnopened && yeniRenk!=="rgb(143, 216, 165)"){
      document.getElementById("pagess").removeChild(linker);
      btnopened=false;
  }
}



function adminLogin(){
  // Eğer daha önce hiç giriş yapılmadıysa varsayılan false ata
  if (!localStorage.getItem("loggedIn")) {
    localStorage.setItem("loggedIn", "false");
  }

  const loggedIn = localStorage.getItem("loggedIn");
  console.log("Giriş durumu: " + loggedIn);

  // true stringi kontrol et
  if (loggedIn === "true") {
    window.location.href = "dashboard.html";
  } else {
    window.location.href = "login.html";
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

/* ===============================
   🧩 Header Yükleme & Dil Uygulama
================================*/
async function loadHeader() {
  try {
    const response = await fetch("header.html");
    if (!response.ok) throw new Error("Header yüklenemedi");

    const data = await response.text();
    document.getElementById("header-placeholder").innerHTML = data;

    // Header yüklendikten sonra dili uygula
    const currentLang = localStorage.getItem("lang") || "tr";
    console.log(`🌍 Aktif dil: "${currentLang}"`);
    loadLanguage(currentLang);

  } catch (err) {
    console.error("❌ Header yükleme hatası:", err);
  }
}

// Sayfa açıldığında header'ı yükle
window.addEventListener("DOMContentLoaded", loadHeader);







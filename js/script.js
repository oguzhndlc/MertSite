function iletiver(){
    alert("Mertim sınavların inşallH GÜZEL GEEÇERRRRRRR");
}
function Mertim() {
    // Mevcut arka plan rengini al
    let renk = window.getComputedStyle(document.body).backgroundColor;   

    // Yeni renk değişkeni tanımla
    let yeniRenk;

    // Şartlara göre yeni rengi belirle
    if (renk === "rgb(169, 169, 202)") {
        yeniRenk = "rgb(143, 216, 165)";
    } else if (renk === "rgb(143, 216, 165)") {
        yeniRenk = "rgb(238, 218, 131)";
    } else {
        yeniRenk = "rgb(169, 169, 202)";
    }

    // Arka plan rengini uygula
    document.body.style.backgroundColor = yeniRenk;

    // Rengi localStorage'a kaydet (kalıcı olsun)
    localStorage.setItem("arkaplanRengi", yeniRenk);
}

// Sayfa her yüklendiğinde kaydedilen rengi uygula
window.addEventListener("load", () => {
    const kayitliRenk = localStorage.getItem("arkaplanRengi");
    if (kayitliRenk) {
        document.body.style.backgroundColor = kayitliRenk;
    }
});

function baslatAnimasyon() {
    const sol = document.getElementById("resimSol");
    const sag = document.getElementById("resimSag");
  
    // Resimleri animasyon sınıfıyla tetikle
    setTimeout(() => sol.classList.add("goster"), 100); // sol resim 0.1s sonra
    setTimeout(() => sag.classList.add("goster"), 500); // sağ resim 0.5s sonra
  
    // Animasyon sonunda DOM temizliği (opsiyonel)
    setTimeout(() => {
      sol.remove();
      sag.remove();
    }, 2500); // 2.5s sonra resimleri kaldır
  }

function showImages() {
  const leftImg = document.querySelector(".side-img.left");
  const rightImg = document.querySelector(".side-img.right");

  // Animasyonu sıfırla
  leftImg.classList.remove("animate");
  rightImg.classList.remove("animate");

  // Reflow (animasyonun tekrar çalışması için)
  void leftImg.offsetWidth;
  void rightImg.offsetWidth;

  // Animasyonu başlat
  leftImg.classList.add("animate");
  rightImg.classList.add("animate");
}
// script.js

let index = 0;
let metin = "";
let yaziDiv = document.getElementById("body-animate-text");

/**
 * Typewriter animasyonu
 */
function typeWriter() {
  if (index < metin.length) {
    yaziDiv.textContent += metin.charAt(index);
    index++;
    setTimeout(typeWriter, 200); // harfler arası gecikme
  }
}

/**
 * Typewriter animasyonunu başlatır veya resetler
 * @param {string} newText - Gösterilecek metin
 */
function startTypeWriter(newText) {
  metin = newText;
  index = 0;
  yaziDiv.textContent = "";
  typeWriter();
}

function iletiver(){
    alert("Mertim sınavların inşallH GÜZEL GEEÇERRRRRRR");
}
function Mertim(){
    let renk = window.getComputedStyle(document.body).backgroundColor;   
    if (renk== "rgb(169, 169, 202)"){
        document.body.style.backgroundColor = "rgb(143, 216, 165)";
    }else if(renk == "rgb(143, 216, 165)"){
        document.body.style.backgroundColor = "rgb(238, 218, 131)";
    }else{
        document.body.style.backgroundColor = "rgb(169, 169, 202)";
    }
}
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
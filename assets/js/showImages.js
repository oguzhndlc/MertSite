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
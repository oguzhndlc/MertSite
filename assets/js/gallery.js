  function fullScreen(imgId) {
    const elem = document.getElementById(imgId);

    if (!elem) {
      console.error('Resim bulunamadı:', imgId);
      return;
    }

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { // Safari
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE11
      elem.msRequestFullscreen();
    } else {
      alert("Tarayıcınız tam ekranı desteklemiyor!");
    }
  }
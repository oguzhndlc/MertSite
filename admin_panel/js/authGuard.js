(function () {
  // Giriş durumu
  const isLoggedIn = sessionStorage.getItem("loggedIn");

  // Giriş yapılmadıysa
  if (isLoggedIn !== "true") {
    // Anasayfaya yönlendir
    window.location.replace("/index.html");
  }
})();

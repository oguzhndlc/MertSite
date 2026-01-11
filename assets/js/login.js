const loginBtn = document.getElementById("loginBtn");
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault(); 
    login();
  }
});

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    // Netlify function'dan kullanıcı verilerini çekiyoruz
    const response = await fetch('/.netlify/functions/getData');
    if (!response.ok) throw new Error('Veri çekilemedi');

    const users = await response.json(); // Örn: [{email:"admin@example.com", password:"1234"}]

    // Girilen bilgiyi kontrol et
    const user = users.find(u => u._user_name === username && u._password === password);

    if (user) {
      // Giriş başarılı → localStorage ile durum kaydet ve admin sayfasına yönlendir
      sessionStorage.setItem("loggedIn", "true");
      window.location.href = "/admin_panel/pages/dashboard.html"; // admin sayfanın doğru URL'si
    } else {
      showToast("Kullanıcı adı veya şifreyi yanlış yazmış olabilir misin canım benim!","warning");
    }

  } catch (error) {
    console.error("Login sırasında hata:", error);
    showToast("Giriş yapılırken bir hata oluştu canım benim bir daha deneyiver!","warning"); 
  }
}

    function adminLogin() {
  // Eğer daha önce hiç giriş yapılmadıysa varsayılan false ata
  if (!sessionStorage.getItem("loggedIn")) {
    sessionStorage.setItem("loggedIn", "false");
  }

  const loggedIn = sessionStorage.getItem("loggedIn");
  console.log("Giriş durumu: " + loggedIn);

  if (loggedIn === "true") {
    window.location.href = "/admin_panel/pages/dashboard.html";
  }
}
adminLogin();
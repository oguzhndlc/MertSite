    // Yeni içerik ekleme
const icerikAlani = document.getElementById("icerikAlani");
const yeniIcerikBtn = document.getElementById("yeniIcerik");

yeniIcerikBtn.addEventListener("click", () => {
  yeniIcerikBtn.classList.remove("animate"); // reset
  void yeniIcerikBtn.offsetWidth;            // RESTART trick
  yeniIcerikBtn.classList.add("animate")
  const yeniCard = document.createElement("div");
  yeniCard.classList.add("col-md-4", "mb-4");
  yeniCard.innerHTML = `  
  <div class="card" style="width: 17rem; height: 24rem;">
              <div style="width: 100%; height:auto; display: flex; justify-content: center;">
                <img src="images/cards/no_image.png" class="card-img-top" style="width: max-content; height: 12rem;" alt="...">
              </div>            
              <div class="card-body">
                <h5 class="card-title">Yeni İçerik</h5>
                <p class="card-text">Bu, kart açıklamasıdır. Burada kartla ilgili kısa bir bilgi yer alır.</p>
                <a onclick="location.href='cont_edit.html?id=0'"class="btn btn-sm btn-warning">Düzenle</a>
              </div>
            </div>
  `;
  icerikAlani.appendChild(yeniCard);
});

// Admin login kontrolü
function adminLogin() {
  if (!sessionStorage.getItem("loggedIn")) {
    sessionStorage.setItem("loggedIn", "false");
  }

  const loggedIn = sessionStorage.getItem("loggedIn");
  console.log("Giriş durumu: " + loggedIn);

  if (loggedIn === "false") {
    window.location.href = "login.html";
  }
}

adminLogin();

// Card silme fonksiyonu
async function deleteCard(delbtn) {
  const delbtnid = Number(delbtn.id.split('-').pop());
  const modalElement = document.getElementById('confirmModal');
  const confirmModal = new bootstrap.Modal(modalElement);
  const evetBtn = document.getElementById("evetBtn");
  const hayirBtn = document.getElementById("hayirBtn");

  // 🔥 BURASI: Modal kapanınca focus'u kaldır
  modalElement.addEventListener("hidden.bs.modal", () => {
    document.activeElement.blur();
  });

  confirmModal.show();

  const onConfirm = async () => {
    confirmModal.hide();
    evetBtn.removeEventListener('click', onConfirm);

    const cardElement = delbtn.closest('.col-md-4');
    if (cardElement) cardElement.remove();

    try {
      if (delbtnid !== "new") {
        const response = await fetch("/.netlify/functions/deleteCards", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: delbtnid })
        });

        const data = await response.json();

        
        // 🚨 4. ADIM: Backend yanıtını kontrol et
        if (!data || !data.deleted) {
          console.error("deleteCards fonksiyonundan beklenmeyen yanıt geldi:", data);
          showToast("Silme sırasında sunucudan geçersiz bir cevap aldım canım.");
          return; // Kod burada durur, aşağıya devam etmez
        }

        const photo_file_path = data.deleted.photo_url;
        const photo_file_name = photo_file_path.slice(13);
        deleteFile(photo_file_name);
      }

      showToast("Canım benim kartı çöpe gönderdim. Canımsın"); 
    } catch (err) {
      console.error(err);
      showToast("Çöp kutusuna isabet ettiremedim yaaaa. Bir hata oldu, canım.");
    }
  };

  evetBtn.addEventListener('click', onConfirm, { once: true });
  hayirBtn.addEventListener('click', () => {
    document.activeElement.blur();
    confirmModal.hide();
    showToast("Demek silmekten vazgeçtin, zaten bence güzel bir içerik sonuçta sen yaptın.");
  }, { once: true });
}

// Toast gösterme fonksiyonu (mesajlar korunuyor)
function showToast(message) {
  const toastLiveExample = document.getElementById('liveToast');
  const toasttext = document.getElementById("texttoast");
  toasttext.innerText = message;
  const toast = new bootstrap.Toast(toastLiveExample);
  toast.show();
}

const deleteFile = async (filename) => {
  const url = '/.netlify/functions/manageGitHub'; // Netlify Function URL
  
  const requestBody = {
    filename: filename, // Silmek istediğiniz dosya adı
    action: 'delete', // Silme işlemi
    branch: 'main', // (Opsiyonel) Branch adı, varsayılan "main"
  };

  try {
    const response = await fetch(url, {
      method: 'POST', // POST isteği, çünkü Netlify Function POST alır
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody), // JSON formatında veri gönder
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Dosya silindi:", data.message);
    } else {
      console.error("GitHub silme hatası:", data.body);
      alert("Dosya silinirken bir hata oluştu.");
    }
  } catch (error) {
    console.error("Hata:", error);
    alert("Bir hata oluştu.");
  }
};

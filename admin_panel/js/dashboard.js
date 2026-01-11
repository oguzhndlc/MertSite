setTimeout( async () => {
showToast("Hoş geldin Camel Yellow alacağım haberin olsun");
showToast("Giriş başarılı", "success");
showToast("Dikkat et", "warning", 2000);
showToast("Hata oluştu", "danger", 4000);

const result = await showAlert(
  "Bu içeriği silmek istediğine emin misin?",
  "Silmeyi Onaylıyor musun"
);

if (result) {
  // EVET
  console.log("Silindi");
} else {
  // HAYIR
  console.log("İptal");
}

  console.log("toast çalıştı")
}, 1000);

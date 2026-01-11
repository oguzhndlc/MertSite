// toast.js
(function () {

  // 🔹 Toast container (stack)
  const containerHTML = `
    <div id="toastContainer"
         class="position-fixed bottom-0 end-0 p-3"
         style="z-index:9999; display:flex; flex-direction:column; gap:10px;">
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", containerHTML);
  const container = document.getElementById("toastContainer");

  const TYPES = {
    info: {
      title: "Bilgi",
      class: "text-primary",
      icon: "bi bi-info-circle-fill"
    },
    success: {
      title: "Başarılı",
      class: "text-success",
      icon: "bi bi-check-circle-fill"
    },
    warning: {
      title: "Uyarı",
      class: "text-warning",
      icon: "bi bi-exclamation-triangle-fill"
    },
    danger: {
      title: "Hata",
      class: "text-danger",
      icon: "bi bi-x-circle-fill"
    }
  };

  window.showToast = function (
    message,
    type = "info",
    delay = 0
  ) {
    setTimeout(() => {

      const config = TYPES[type] || TYPES.info;

      // 🔹 Her toast için ayrı element
      const toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role", "alert");
      toastEl.setAttribute("aria-live", "assertive");
      toastEl.setAttribute("aria-atomic", "true");

      toastEl.innerHTML = `
        <div class="toast-header">
          <img src="/assets/images/profiles/sup_profile.png"
               class="rounded me-2"
               style="width:32px;height:32px">
          <i class="${config.icon} ${config.class} me-2 fs-5"></i>
          <strong class="me-auto">${config.title}</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">${message}</div>
      `;

      // 🔥 Yeni toast ALTA eklenir → eskiler yukarı itilir
      container.appendChild(toastEl);

      const toast = new bootstrap.Toast(toastEl, { delay: 4000 });
      toast.show();

      // 🧹 Kapanınca DOM’dan sil
      toastEl.addEventListener("hidden.bs.toast", () => {
        toastEl.remove();
      });

    }, delay);
  };

})();

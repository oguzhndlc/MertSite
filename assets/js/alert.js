// alert.js
(function () {

  const modalHTML = `
    <div class="modal fade" id="globalConfirmModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content text-center">
          <div class="modal-body">
            <div style="font-size:32px">⚠️</div>
            <h5 class="mb-3" id="alertTitle">Emin misiniz?</h5>
            <p id="alertMessage"></p>
          </div>
          <div class="modal-footer justify-content-center">
            <button id="alertYes" class="btn btn-danger">Evet</button>
            <button id="alertNo" class="btn btn-secondary">Hayır</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  let resolveFn = null;

  window.showAlert = function (message, title = "Emin misiniz?") {
    return new Promise(resolve => {
      resolveFn = resolve;

      document.getElementById("alertTitle").innerText = title;
      document.getElementById("alertMessage").innerText = message;

      const modalEl = document.getElementById("globalConfirmModal");
      const modal = new bootstrap.Modal(modalEl);

      modal.show();

      const yesBtn = document.getElementById("alertYes");
      const noBtn  = document.getElementById("alertNo");

      yesBtn.onclick = () => {
        document.activeElement?.blur(); // 🔥 FOCUS TEMİZLE
        modal.hide();
        resolveFn(true);
      };

      noBtn.onclick = () => {
        document.activeElement?.blur(); // 🔥 FOCUS TEMİZLE
        modal.hide();
        resolveFn(false);
      };
    });
  };

})();

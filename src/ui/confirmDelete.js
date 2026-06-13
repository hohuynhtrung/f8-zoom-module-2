const deleteModal = document.querySelector("#delete-confirm-modal");
const modalTitle = document.querySelector("#delete-modal-title");
const modalMessage = document.querySelector("#delete-modal-message");
const btnClose = document.querySelector("#delete-modal-close");
const btnCancel = document.querySelector("#delete-modal-cancel");
const btnConfirm = document.querySelector("#delete-modal-confirm");

let onConfirmCallback = null;

function closeDeleteModal() {
  deleteModal.classList.add("hidden");
  deleteModal.style.display = "none";
  onConfirmCallback = null;
}

[btnClose, btnCancel].forEach((btn) => {
  if (btn) btn.addEventListener("click", closeDeleteModal);
});

if (deleteModal) {
  deleteModal.addEventListener("click", (e) => {
    if (e.target === deleteModal) closeDeleteModal();
  });
}

if (btnConfirm) {
  btnConfirm.addEventListener("click", async () => {
    if (typeof onConfirmCallback === "function") {
      btnConfirm.disabled = true;

      await onConfirmCallback();

      btnConfirm.disabled = false;
      btnConfirm.textContent = "Delete";
      closeDeleteModal();
    }
  });
}

export function showConfirmDelete({ title, message, onConfirm }) {
  if (!deleteModal) return;
  if (modalTitle) modalTitle.textContent = title || "Delete this item?";
  if (modalMessage)
    modalMessage.textContent = message || "Are you sure delete this item?";

  onConfirmCallback = onConfirm;

  deleteModal.classList.remove("hidden");
  deleteModal.style.display = "flex";
}

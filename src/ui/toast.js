/* Xóa nội dung thông báo trên cả hai form auth */
export function clearAuthMessages() {
  const signupMess = document.querySelector("#signupMess");
  const loginMess = document.querySelector("#loginMess");
  if (signupMess) signupMess.textContent = "";
  if (loginMess) loginMess.textContent = "";
}

/* Hiển thị message thành công hoặc lỗi trên form */
export function showToast(messageEl, message, isSuccess) {
  messageEl.style.color = isSuccess ? "#1ed760" : "red";
  messageEl.textContent = message;
}

/* Hiển thị message thành công, reset form và tự đóng modal sau 1 giây */
export function showSuccessAndClose(messageEl, message, form) {
  showToast(messageEl, message, true);
  form.reset();

  const authModal = document.querySelector("#authModal");
  setTimeout(() => {
    authModal.classList.remove("show");
    messageEl.textContent = "";
  }, 1000);
}

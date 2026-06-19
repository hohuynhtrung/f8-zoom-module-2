import { loginApi } from "../api/authApi.js";
import { saveSession } from "../utils/storage.js";
import { updateAuthUI } from "./authUI.js";
import { showToast, showSuccessAndClose } from "../ui/toast.js";
import { checkAndRenderAuthComponents } from "../ui/authView.js";

export default function login() {
  const form = document.querySelector("#loginForm .auth-form-content");
  const loginMess = document.querySelector("#loginMess");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector("#loginEmail").value.trim();
    const password = document.querySelector("#loginPassword").value.trim();

    try {
      const res = await loginApi({ email, password });

      saveSession(res);
      updateAuthUI();
      checkAndRenderAuthComponents();
      showSuccessAndClose(loginMess, res.message, form);
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (error) {
      showToast(loginMess, error?.error?.message || "Login failed!", false);
    }
  });
}

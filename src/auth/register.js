import { registerApi } from "../api/authApi.js";
import { saveSession } from "../utils/storage.js";
import { updateAuthUI } from "./authUI.js";
import { showToast, showSuccessAndClose } from "../ui/toast.js";
import { checkAndRenderAuthComponents } from "../ui/authView.js";

export default function register() {
  const form = document.querySelector("#signupForm .auth-form-content");
  const signupMess = document.querySelector("#signupMess");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.querySelector("#userName").value.trim();
    const email = document.querySelector("#signupEmail").value.trim();
    const password = document.querySelector("#signupPassword").value.trim();

    try {
      const res = await registerApi({ username, email, password });

      saveSession(res);
      updateAuthUI();
      checkAndRenderAuthComponents();
      showSuccessAndClose(signupMess, res.message, form);
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (error) {
      showToast(
        signupMess,
        error?.error?.message || "Registration failed!",
        false,
      );
    }
  });
}

import { loginApi } from "../api/authApi.js";
import { saveSession } from "../utils/storage.js";
import { updateAuthUI } from "./authUI.js";
import { showToast, showSuccessAndClose } from "../ui/toast.js";

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
      showSuccessAndClose(loginMess, res.message, form);
    } catch (error) {
      showToast(loginMess, error?.error?.message || "Login failed!", false);
    }
  });
}

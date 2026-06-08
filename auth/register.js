import httpRequest from "../utils/httpRequest.js";
import { updateAuthUI } from "./authUI.js";

export default function register() {
  const form = document.querySelector("#signupForm .auth-form-content");
  const signupMess = document.querySelector("#signupMess");
  const authModal = document.querySelector("#authModal");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.querySelector("#userName").value.trim();
    const email = document.querySelector("#signupEmail").value.trim();
    const password = document.querySelector("#signupPassword").value.trim();

    try {
      const res = await httpRequest.post("auth/register", {
        username,
        email,
        password,
      });

      localStorage.setItem("accessToken", res.access_token);
      localStorage.setItem("refreshToken", res.refresh_token);
      localStorage.setItem("user", JSON.stringify(res.user));

      updateAuthUI();

      signupMess.style.color = "#1ed760";
      signupMess.textContent = res.message;

      form.reset();

      setTimeout(() => {
        authModal.classList.remove("show");
        signupMess.textContent = "";
      }, 1000);
    } catch (error) {
      signupMess.style.color = "red";
      signupMess.textContent = error?.error?.message || "Registration failed!";
    }
  });
}

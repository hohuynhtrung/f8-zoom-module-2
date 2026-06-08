import httpRequest from "../utils/httpRequest.js";
import { updateAuthUI } from "./authUI.js";

export default function login() {
  const form = document.querySelector("#loginForm .auth-form-content");
  const loginMess = document.querySelector("#loginMess");
  const authModal = document.querySelector("#authModal");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.querySelector("#loginEmail").value.trim();
    const password = document.querySelector("#loginPassword").value.trim();

    try {
      const res = await httpRequest.post("auth/login", {
        email,
        password,
      });

      localStorage.setItem("accessToken", res.access_token);
      localStorage.setItem("refreshToken", res.refresh_token);
      localStorage.setItem("user", JSON.stringify(res.user));

      updateAuthUI();

      loginMess.style.color = "#1ed760";
      loginMess.textContent = res.message;

      form.reset();

      setTimeout(() => {
        authModal.classList.remove("show");
        loginMess.textContent = "";
      }, 1000);
    } catch (error) {
      loginMess.style.color = "red";
      loginMess.textContent = error?.error?.message || "Login failed!";
    }
  });
}

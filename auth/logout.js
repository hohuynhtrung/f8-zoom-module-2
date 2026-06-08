import httpRequest from "../utils/httpRequest.js";
import { updateAuthUI } from "./authUI.js";

export default function logout() {
  const logoutBtn = document.querySelector("#logoutBtn");

  const userDropdown = document.querySelector("#userDropdown");

  logoutBtn.addEventListener("click", async () => {
    try {
      await httpRequest.post("auth/logout", {
        refresh_token: localStorage.getItem("refreshToken"),
      });
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.clear();

      updateAuthUI();

      userDropdown.classList.remove("show");
    }
  });
}

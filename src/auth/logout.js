import { logoutApi } from "../api/authApi.js";
import { getRefreshToken, clearSession } from "../utils/storage.js";
import { updateAuthUI } from "./authUI.js";
import { hideUserDropdown } from "../ui/dropdown.js";

export default function logout() {
  const logoutBtn = document.querySelector("#logoutBtn");

  logoutBtn.addEventListener("click", async () => {
    try {
      await logoutApi(getRefreshToken());
    } catch (error) {
      console.log(error);
    } finally {
      clearSession();
      updateAuthUI();
      hideUserDropdown();
    }
  });
}

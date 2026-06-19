import { logoutApi } from "../api/authApi.js";
import { getRefreshToken, clearSession } from "../utils/storage.js";
import { updateAuthUI } from "./authUI.js";
import { hideUserDropdown } from "../ui/dropdown.js";
import { checkAndRenderAuthComponents } from "../ui/authView.js";

export default function logout() {
  const logoutBtn = document.querySelector("#logoutBtn");

  logoutBtn.addEventListener("click", async () => {
    try {
      await logoutApi(getRefreshToken());
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      clearSession();
      updateAuthUI();
      checkAndRenderAuthComponents();
      hideUserDropdown();
    }
  });
}

import initModal from "./ui/modal.js";
import initDropdown from "./ui/dropdown.js";
import register from "./auth/register.js";
import login from "./auth/login.js";
import logout from "./auth/logout.js";
import { updateAuthUI } from "./auth/authUI.js";
import initArtists from "./artists/index.js";
import initHits from "./hits/index.js";
import { showHomeContent, showPlayListNav } from "./ui/veiws.js";

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  initModal();
  initDropdown();
  register();
  login();
  logout();
  updateAuthUI();

  showHomeContent();
  showPlayListNav();

  initHits();
  initArtists();
});

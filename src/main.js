import initModal from "./ui/modal.js";
import initDropdown from "./ui/dropdown.js";
import register from "./auth/register.js";
import login from "./auth/login.js";
import logout from "./auth/logout.js";
import { updateAuthUI } from "./auth/authUI.js";
import initAlbums from "./albums/index.js";
import initArtists from "./artists/index.js";

document.addEventListener("DOMContentLoaded", () => {
  initModal();
  initDropdown();
  register();
  login();
  logout();
  updateAuthUI();
  initAlbums();
  initArtists();
});

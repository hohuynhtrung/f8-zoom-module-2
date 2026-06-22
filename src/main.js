import initModal from "./ui/modalAuth.js";
import initDropdown, { showSortDropdown } from "./ui/dropdown.js";
import register from "./auth/register.js";
import login from "./auth/login.js";
import logout from "./auth/logout.js";
import { updateAuthUI } from "./auth/authUI.js";
import initArtists from "./artists/index.js";
import initHits from "./hits/index.js";
import { showHomeContent, showPlayListNav } from "./ui/veiws.js";
import initPlaylist from "./playlists/index.js";
import initModalPlaylist from "./ui/modalPlaylist.js";
import initHitEvent from "./hits/event.js";
import { initFooterControls } from "./player/events.js";
import {
  checkAndRenderAuthComponents,
  initAuthFooterBanner,
  showRequestAuth,
} from "./ui/authView.js";

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  initModal();
  initModalPlaylist();
  initDropdown();
  register();
  login();
  logout();
  updateAuthUI();

  showHomeContent();
  showPlayListNav();
  showSortDropdown();

  initHits();
  initArtists();
  initPlaylist();

  initHitEvent();
  initFooterControls();

  initAuthFooterBanner();
  checkAndRenderAuthComponents();
  showRequestAuth();
});

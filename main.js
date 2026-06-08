import modal from "./ui/modal.js";

import register from "./auth/register.js";
import login from "./auth/login.js";
import logout from "./auth/logout.js";

import { updateAuthUI } from "./auth/authUI.js";

import { hitAlbums } from "./albums/albumApi.js";

document.addEventListener("DOMContentLoaded", () => {
  modal();

  register();

  login();

  logout();

  updateAuthUI();

  hitAlbums();
});

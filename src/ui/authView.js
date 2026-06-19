import { audioPlayer, globalAudio } from "../utils/audioPlayer.js";
import { getAccessToken } from "../utils/storage.js";

export function checkAndRenderAuthComponents() {
  const isLoggedIn = !!getAccessToken();

  const sidebar =
    document.querySelector(".sidebar") ||
    document.querySelector(".library-artists");
  const playerBanner = document.querySelector(".player-footer-banner");
  const authBanner = document.querySelector(".auth-footer-banner");
  const appContainer = document.querySelector(".app-container");

  if (!isLoggedIn) {
    if (sidebar) sidebar.classList.add("auth-locked");
    if (playerBanner) playerBanner.classList.add("hidden");
    if (authBanner) authBanner.classList.add("is-active");
    if (appContainer) appContainer.classList.add("is-guest");

    if (globalAudio.src && !globalAudio.paused) {
      audioPlayer.toggle();
    }
  } else {
    if (sidebar) sidebar.classList.remove("auth-locked");
    if (playerBanner) playerBanner.classList.remove("hidden");
    if (authBanner) authBanner.classList.remove("is-active");
    if (appContainer) appContainer.classList.remove("is-guest");
  }
}

export function initAuthFooterBanner() {
  const signupBtn = document.querySelector(".auth-footer-banner__btn");
  if (!signupBtn) return;

  signupBtn.addEventListener("click", () => {
    document.querySelector(".signup-btn")?.click();
  });
}

export function showRequestAuth() {
  const authRequestModal = document.getElementById("auth-request");
  if (!authRequestModal) return;

  document.addEventListener("click", (e) => {
    const isLoggedIn = !!getAccessToken();

    if (!isLoggedIn) {
      const targetCreateBtn = e.target.closest(".create-btn");
      const targetFollowBtn = e.target.closest(".follow-btn");

      if (targetCreateBtn || targetFollowBtn) {
        e.preventDefault();
        e.stopImmediatePropagation();
        authRequestModal.classList.add("show");
        return;
      }
    }

    const isCloseBtn =
      e.target.id === "close-auth-request" ||
      e.target.closest(".auth-request__close-btn");
    const isClickOutside = e.target === authRequestModal;

    if (isCloseBtn || isClickOutside) {
      authRequestModal.classList.remove("show");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && authRequestModal.classList.contains("show")) {
      authRequestModal.classList.remove("show");
    }
  });
}

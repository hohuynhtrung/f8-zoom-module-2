let isCurrentPlaylistPublic = true;

export function showModalPlaylist() {
  document.querySelector("#edit-playlist-modal").classList.add("show");
}

export function closeModalPlaylist() {
  document.querySelector("#edit-playlist-modal").classList.remove("show");
}

export function getIsPublicState() {
  return isCurrentPlaylistPublic;
}

export function setIsPublicState(value) {
  isCurrentPlaylistPublic = value === 1 || value === true;
  const modalPublicBtn = document.querySelector(".playlist-modal-public-btn");
  if (modalPublicBtn) {
    modalPublicBtn.textContent = isCurrentPlaylistPublic
      ? "Make private"
      : "Make public";
    modalPublicBtn.classList.toggle(
      "is-private-style",
      !isCurrentPlaylistPublic,
    );
  }
}

export default function initModalPlaylist() {
  const chooseBtn = document.querySelector("#choose-photo-btn");
  const closeBtn = document.querySelector(".playlist-modal-close-btn");
  const modalPublicBtn = document.querySelector(".playlist-modal-public-btn");

  if (chooseBtn) chooseBtn.addEventListener("click", showModalPlaylist);
  if (closeBtn) closeBtn.addEventListener("click", closeModalPlaylist);

  if (modalPublicBtn) {
    modalPublicBtn.addEventListener("click", () => {
      isCurrentPlaylistPublic = !isCurrentPlaylistPublic;
      modalPublicBtn.textContent = isCurrentPlaylistPublic
        ? "Make private"
        : "Make public";
      modalPublicBtn.classList.toggle(
        "is-private-style",
        !isCurrentPlaylistPublic,
      );
    });
  }
}

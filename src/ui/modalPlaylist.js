export function showModalPlaylist() {
  document.querySelector("#edit-playlist-modal").classList.add("show");
}

export function closeModalPlaylist() {
  document.querySelector("#edit-playlist-modal").classList.remove("show");
}

export default function initModalPlaylist() {
  const chooseBtn = document.querySelector("#choose-photo-btn");
  const closeBtn = document.querySelector(".playlist-modal-close-btn");
  chooseBtn.addEventListener("click", showModalPlaylist);
  closeBtn.addEventListener("click", closeModalPlaylist);
}

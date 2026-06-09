const homeContent = document.querySelector(".home-content");
const detailContent = document.querySelector(".detail-content");
const playContent = document.querySelector(".playlist-content");
const homeBtn = document.querySelector(".home-btn");
const createBtn = document.querySelector(".create-btn");

homeBtn.addEventListener("click", () => {
  showHomeContent();
});

createBtn.addEventListener("click", () => {
  showPlayContent();
});

export function showHomeContent() {
  homeContent.classList.remove("hidden");
  detailContent.classList.add("hidden");
  playContent.classList.add("hidden");
}

export function showDetailContent() {
  detailContent.classList.remove("hidden");
  homeContent.classList.add("hidden");
  playContent.classList.add("hidden");
}

export function showPlayContent() {
  playContent.classList.remove("hidden");
  homeContent.classList.add("hidden");
  detailContent.classList.add("hidden");
}

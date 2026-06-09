const homeContent = document.querySelector(".home-content");
const detailContent = document.querySelector(".detail-content");
const homeBtn = document.querySelector(".home-btn");

homeBtn.addEventListener("click", () => {
  showHomeContent();
});

export function showHomeContent() {
  homeContent.classList.remove("hidden");
  detailContent.classList.add("hidden");
}

export function showDetailContent() {
  homeContent.classList.add("hidden");
  detailContent.classList.remove("hidden");
}

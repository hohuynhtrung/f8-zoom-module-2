/* Ẩn dropdown menu user */
export function hideUserDropdown() {
  document.querySelector("#userDropdown").classList.remove("show");
}

/* Toggle dropdown menu user */
export function toggleUserDropdown() {
  document.querySelector("#userDropdown").classList.toggle("show");
}

// dropdown user
export default function initDropdown() {
  const userInfo = document.querySelector("#userInfo");

  userInfo.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleUserDropdown();
  });

  document.addEventListener("click", hideUserDropdown);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") hideUserDropdown();
  });
}

// dropdown sort by
export function showSortDropdown() {
  const sortBtn = document.querySelector(".sort-btn");
  const dropdownSort = document.querySelector(".recent-dropdown");

  if (!sortBtn || !dropdownSort) return;

  sortBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownSort.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (!dropdownSort.contains(e.target) && e.target !== sortBtn) {
      dropdownSort.classList.remove("show");
    }
  });
}

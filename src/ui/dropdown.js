/* Ẩn dropdown menu user */
export function hideUserDropdown() {
  document.querySelector("#userDropdown").classList.remove("show");
}

/* Toggle dropdown menu user */
export function toggleUserDropdown() {
  document.querySelector("#userDropdown").classList.toggle("show");
}

/* Gắn event listener cho dropdown user */
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

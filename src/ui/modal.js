import { clearAuthMessages } from "./toast.js";
/* Hiển thị form Sign Up, ẩn form Login */
export function showSignupForm() {
  document.querySelector("#signupForm").style.display = "block";
  document.querySelector("#loginForm").style.display = "none";
  clearAuthMessages();
  document.querySelector("#authModal").classList.add("show");
}

/* Hiển thị form Login, ẩn form Sign Up */
export function showLoginForm() {
  document.querySelector("#loginForm").style.display = "block";
  document.querySelector("#signupForm").style.display = "none";
  clearAuthMessages();
  document.querySelector("#authModal").classList.add("show");
}

/* Đóng modal auth */
export function closeAuthModal() {
  document.querySelector("#authModal").classList.remove("show");
}

/* Gắn event listener cho modal auth */
export default function initModal() {
  const signupBtn = document.querySelector(".signup-btn");
  const loginBtn = document.querySelector(".login-btn");
  const textShowLogin = document.querySelector("#textShowLogin");
  const textShowSignup = document.querySelector("#textShowSignup");
  const authModal = document.querySelector("#authModal");
  const modalClose = document.querySelector("#modalClose");

  signupBtn.addEventListener("click", showSignupForm);
  loginBtn.addEventListener("click", showLoginForm);
  textShowLogin.addEventListener("click", showLoginForm);
  textShowSignup.addEventListener("click", showSignupForm);
  modalClose.addEventListener("click", closeAuthModal);

  authModal.addEventListener("click", (e) => {
    if (e.target === authModal) closeAuthModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAuthModal();
  });
}

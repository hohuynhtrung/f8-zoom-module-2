export default function modal() {
  const signupBtn = document.querySelector(".signup-btn");
  const loginBtn = document.querySelector(".login-btn");

  const textShowLogin = document.querySelector("#textShowLogin");
  const textShowSignup = document.querySelector("#textShowSignup");

  const authModal = document.querySelector("#authModal");
  const signupForm = document.querySelector("#signupForm");
  const loginForm = document.querySelector("#loginForm");

  const modalClose = document.querySelector("#modalClose");
  const userInfo = document.querySelector("#userInfo");
  const userDropdown = document.querySelector("#userDropdown");

  // Hiện form signup
  function showSignup() {
    signupForm.style.display = "block";
    loginForm.style.display = "none";

    document.querySelector("#signupMess").textContent = "";
    const loginMess = document.querySelector("#loginMess");
    if (loginMess) loginMess.textContent = "";

    authModal.classList.add("show");
  }

  // Hiện form login
  function showLogin() {
    loginForm.style.display = "block";
    signupForm.style.display = "none";

    const signupMess = document.querySelector("#signupMess");
    if (signupMess) signupMess.textContent = "";

    const loginMess = document.querySelector("#loginMess");
    if (loginMess) loginMess.textContent = "";

    authModal.classList.add("show");
  }

  // Đóng modal
  function closeModal() {
    authModal.classList.remove("show");
  }

  // Button mở modal
  signupBtn.addEventListener("click", showSignup);
  loginBtn.addEventListener("click", showLogin);

  textShowLogin.addEventListener("click", showLogin);
  textShowSignup.addEventListener("click", showSignup);

  // Nút X
  modalClose.addEventListener("click", closeModal);

  // Click ra ngoài modal
  authModal.addEventListener("click", (e) => {
    if (e.target === authModal) {
      closeModal();
    }
  });

  // Nhấn ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
  userInfo.addEventListener("click", (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle("show");
  });

  document.addEventListener("click", () => {
    userDropdown.classList.remove("show");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      userDropdown.classList.remove("show");
    }
  });
}

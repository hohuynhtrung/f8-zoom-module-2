export function updateAuthUI() {
  const signupBtn = document.querySelector(".signup-btn");
  const loginBtn = document.querySelector(".login-btn");
  const userInfo = document.querySelector("#userInfo");
  const userNameInfo = document.querySelector(".user-name-info");

  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    signupBtn.style.display = "none";
    loginBtn.style.display = "none";

    userInfo.style.display = "flex";
    userNameInfo.textContent = user.username;
  } else {
    signupBtn.style.display = "";
    loginBtn.style.display = "";

    userInfo.style.display = "none";
  }
}

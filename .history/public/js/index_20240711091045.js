import { handleLogin, handleLogout } from "./login";
import { displayMap } from "./mapbox";
import { updateSetting } from "./updateSetting";

// DOM ELEMENTS
const mapBox = document.getElementById("map");
const loginForm = document.querySelector(".form--login");
const logoutBtn = document.querySelector(".nav__el--logout");
const userDataForm = document.querySelector(".form-user-data");
const userFormPassword = document.querySelector(".form-user-password");
const btnSavePassword = document.querySelector(".btn--save-password");

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener("submit", (el) => {
    el.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    handleLogin(email, password);
  });
}

if (logoutBtn) logoutBtn.addEventListener("click", handleLogout);

if (userDataForm)
  userDataForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    updateSetting("data", { name, email });
  });

if (userFormPassword) {
  userFormPassword.addEventListener("submit", async (e) => {
    e.preventDefault();
    let passwordCurrent = document.getElementById("password-current").value;
    let password = document.getElementById("password").value;
    let passwordConfirm = document.getElementById("password-confirm").value;
    await updateSetting("password", {
      passwordCurrent,
      password,
      passwordConfirm,
    });
    passwordCurrent = "";
    password = "";
    passwordConfirm = "";
  });
}

import { handleLogin, handleLogout } from "./login";
import { displayMap } from "./mapbox";
import { updateSetting } from "./updateSetting";
import {book} from "./strip"
// DOM ELEMENTS
const mapBox = document.getElementById("map");
const loginForm = document.querySelector(".form--login");
const logoutBtn = document.querySelector(".nav__el--logout");
const userDataForm = document.querySelector(".form-user-data");
const userFormPassword = document.querySelector(".form-user-password");
const btnSavePassword = document.querySelector(".btn--save-password");
const 

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
    // const name = document.getElementById("name").value;
    // const email = document.getElementById("email").value;
    const form = new FormData();
    form.append("name", document.getElementById("name").value);
    form.append("email", document.getElementById("email").value);
    form.append("photo", document.getElementById("photo").files[0]);
    updateSetting("data", form);
    location.reload();
  });

if (userFormPassword) {
  userFormPassword.addEventListener("submit", async (e) => {
    e.preventDefault();
    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    await updateSetting("password", {
      passwordCurrent,
      password,
      passwordConfirm,
    });
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
  });
}

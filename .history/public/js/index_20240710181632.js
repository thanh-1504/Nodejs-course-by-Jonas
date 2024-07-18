import { handleLogin, handleLogout } from "./login";
import { displayMap } from "./mapbox";
import { updateSetting } from "./updateSetting";

// DOM ELEMENTS
const mapBox = document.getElementById("map");
const loginForm = document.querySelector(".form--login");
const logoutBtn = document.querySelector(".nav__el--logout");
const userDataForm = document.querySelector('.form-user-data');

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
    updateSetting(name, email);
  });

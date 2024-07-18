import { handleLogin } from "./login";
import { displayMap } from "./mapbox";

// DOM ELEMENTS
const mapBox = document.getElementById("map");
const loginForm = document.querySelector(".form");

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

import axios from "axios";
import { handleLogin } from "./login";
import { displayMap } from "./mapbox";

// DOM ELEMENTS
const mapBox = document.getElementById("map");
const loginForm = document.querySelector(".form");
// VALUES


// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener("submit", (el) => {
    el.preventDefault();
    handleLogin(email, password);
  });
}

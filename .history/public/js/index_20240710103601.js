import axios from "axios";
import { handleLogin } from "./login";
import { displayMap } from "./mapbox";

// DOM 
const mapBox = document.getElementById("map");
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}
document.querySelector(".form").addEventListener("submit", (el) => {
  el.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  handleLogin(email, password);
});

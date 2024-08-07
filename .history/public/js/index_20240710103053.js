import axios from "axios";
import { handleLogin } from "./login";

const locations = JSON.parse(document.getElementById("map").dataset.locations);
document.querySelector(".form").addEventListener("submit", (el) => {
  el.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  handleLogin(email, password);
});

import from "ax"
import { handleLogin } from "./login";
document.querySelector(".form").addEventListener("submit", (el) => {
  el.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  handleLogin(email, password);
});

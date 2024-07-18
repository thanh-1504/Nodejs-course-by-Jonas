const handleLogin = (email, password) => {
    console.log(email,password);
    const res = await axi
};
document.querySelector(".form").addEventListener("submit", (el) => {
  el.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  handleLogin(email, password);
});

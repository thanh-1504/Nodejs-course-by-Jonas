const handleLogin = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/v1/users/login",
      data: { email, password },
    });
    if (res.data.status)
    console.log(res);
  } catch (err) {
    console.log(err.response.data);
  }
};
document.querySelector(".form").addEventListener("submit", (el) => {
  el.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  handleLogin(email, password);
});

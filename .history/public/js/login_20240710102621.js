const handleLogin = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/v1/users/login",
      data: { email, password },
    });
    if (res.data.status === "success") {
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }
    console.log(res);
  } catch (err) {
    console.log(err.response.data);
  }
};


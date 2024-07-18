import axios from "axios";
import { showAlert } from "./alert";
export const handleLogin = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/v1/users/login",
      data: { email, password },
    });
    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }
    console.log(res);
  } catch (err) {
    showAlert("error", err.response.data.message);
    console.log(err.response.data);
  }
};

export const handleLogout = async () => {
  try {
    await axios({
      method: "GET",
      url: "http://127.0.0.1:8000/api/v1/users/logout",
    });
    showAlert("success", "Log out successfully");
    location.reload()
  } catch (err) {
    showAlert("error", "Some thing was wrong with server");
  }
};

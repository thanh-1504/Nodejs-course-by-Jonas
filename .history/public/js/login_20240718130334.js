import axios from "axios";
import { showAlert } from "./alert";
export const handleLogin = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/v1/users/login",
      data: { email, password },
      withCredentials: true,
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
    const res = await axios({
      method: "GET",
      url: "/v1/users/logout",
    });
    if (res.data.status === "success") {
      showAlert("success", "Log out successfully");
      location.reload(true);
    }
  } catch (err) {
    console.log(err);
    showAlert("error", "Some thing was wrong with server");
  }
};

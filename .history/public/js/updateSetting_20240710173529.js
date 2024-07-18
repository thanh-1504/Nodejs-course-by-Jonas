import axios from "axios";
import { showAlert } from "alert.js";
export const updateData = async (name, email) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://localhost//api/v1/users/updateMe",
      data: { name, email },
    });
    if (res.data.status === "success") {
      showAlert("success", "Data updated successfully");
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

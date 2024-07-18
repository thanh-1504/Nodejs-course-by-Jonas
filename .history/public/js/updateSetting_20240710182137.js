import axios from "axios";
import { showAlert } from "alert.js";
export const updateSetting = async (name, email) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://localhost:8000/api/v1/users/",
      data: { name, email },
    });
    if (res.data.status === "success") {
      showAlert("success", "Data updated successfully");
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

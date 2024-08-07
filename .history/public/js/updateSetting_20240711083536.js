import axios from "axios";
import { showAlert } from "./alert";

export const updateSetting = async (type,data) => {
  try {
    const url = type === 'password' ? "{{URL}}/api/v1/users/updatePassword" : "http://127.0.0.1:8000/api/v1/users/updateMe"
    const res = await axios({
      method: "PATCH",
      url: "http://127.0.0.1:8000/api/v1/users/updateMe",
      data: { name, email },
    });
    if (res.data.status === "success") {
      showAlert("success", "Data updated successfully");
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

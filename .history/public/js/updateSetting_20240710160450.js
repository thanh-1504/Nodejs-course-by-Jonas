import axios from "axios";
import { showAlert } from "alert.js";
export const updateData = (email,password) {
    try {
        const res = await axios({
            method:"PATCH",
            url:"http://127.0.0.1:8000/api/v1/users/update"
        })
    } catch(err) {
        showAlert("error",err.response.data.message);
    }
}
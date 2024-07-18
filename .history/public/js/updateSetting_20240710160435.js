import axios from "axios";
import { showAlert } from "alert.js";
export const updateData = (email,password) {
    try {
        const res = await axios({
            method:"PATCH",
            url:"http:"
        })
    } catch(err) {
        showAlert("error",err.response.data.message);
    }
}
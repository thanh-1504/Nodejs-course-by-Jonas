import axios from "axios";
import { showAlert } from "alert.js";
export const updateData = (email,password) {
    try {
        const res = await 
    } catch(err) {
        showAlert("error",err.response.data.message);
    }
}
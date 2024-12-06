import axios from "axios";

export default axios.create({
    baseURL: "https://webdev-praktek-kel1-production.up.railway.app/api",
    headers: {
        "Content-type": "application/json"
    }
});
import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};

const login = (username, password) => {
    return axios.post(API_URL + "signin", {
        username,
        password,
    })
    .then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    });
};

const googleLogin = (token) => {
    return axios.post(API_URL + "google-login", {
        token,
    }).then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

// Fungsi untuk mendapatkan user_id secara langsung
const getUserId = () => {
    const user = getCurrentUser();
    return user ? user.id : null;
};

// Fungsi untuk mendapatkan accessToken secara langsung
const getToken = () => {
    const user = getCurrentUser();
    return user ? user.accessToken : null;
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    googleLogin,
    getUserId,
    getToken,
};

export default AuthService;
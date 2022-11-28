// import axios from "axios";
import apiClient from "../utils/apiClient";

const register = (data) => {
    return apiClient.post('/register', data);
};

const login = (data) => {
    return apiClient.post('/login', data);
};

const forgotPassword = (email) => {
    return apiClient.post('/forget-password', email);
}

const resetPassword = (data) => {
    return apiClient.post('/reset-password', data);
}

const authAPI = {
    register,
    login,
    forgotPassword,
    resetPassword,
}

export default authAPI;
import axios from "axios";
import { logout, isTokenExpired } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    if (isTokenExpired(token)) {
      logout();
      return Promise.reject("Token expired");
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      logout();
    }
    return Promise.reject(err);
  }
);

export default api;
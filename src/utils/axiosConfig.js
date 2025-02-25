// src/utils/axiosConfig.js
import axios from "axios"; // Import your Redux store
import { logout } from "../store/authSlice"; // Import logout action (for handling expired tokens)
import store from "../store";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api", // Base URL for your API
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include JWT in headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from Redux store (or localStorage as fallback)
    const token =
      store.getState().auth.token || localStorage.getItem("userToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add token to headers
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors (e.g., expired token)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized (401) errors
    if (error.response && error.response.status === 401) {
      // Clear token if unauthorized
      store.dispatch(logout());
      window.location.href = "/"; // Redirect to login page (or any other page)
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

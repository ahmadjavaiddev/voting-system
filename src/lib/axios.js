// utils/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/", // Adjust based on your API URL
});

// Add request interceptor to include credentials
axiosInstance.interceptors.request.use((config) => {
  config.withCredentials = true; // Ensures cookies are sent
  return config;
});

export default axiosInstance;

// src/utils/axiosClient.js
import axios from "axios";
import { getToken } from "@clerk/clerk-js";

const api = axios.create({
  baseURL: "https://your-api.com", // Replace with your backend API base URL
});

// Automatically add token to Authorization header
api.interceptors.request.use(async (config) => {
  const token = await getToken({ template: "default" }); // Optional template
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

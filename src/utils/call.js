// utils/call.js

import axios from "axios";

// Base URL of your API
const API_BASE_URL = "https://wysbackend.onrender.com/api"; // Replace with your API base URL

// Default token if user is not authenticated
const DEFAULT_TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2VmYzczNTQ2MjAyNzliMDA5YmMxNmUiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTc0MzkxODE1NSwiZXhwIjoxNzQ0MDA0NTU1fQ.oYsDaqqiApc09q6bocw9biGuvZFYUuXU8TwvJ12gjIE"; // Replace with your actual fallback token

// Create a reusable Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const userToken = getUserToken(); // You can customize this function to get user token from localStorage, context, etc.
    config.headers.Authorization = userToken
      ? `Bearer ${userToken}`
      : DEFAULT_TOKEN;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    if (message.toLowerCase().includes("jwt")) {
      handleTokenExpired();
    }
    return Promise.reject(new Error(message));
  }
);

const handleTokenExpired = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessToken");
  }
};

// Example function to get user token from localStorage
const getUserToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

// GET request
export const apiGet = (endpoint, config = {}) => {
  return apiClient.get(endpoint, config);
};

// POST request
export const apiPost = (endpoint, data, config = {}) => {
  return apiClient.post(endpoint, data, config);
};

// PUT request
export const apiPut = (endpoint, data, config = {}) => {
  return apiClient.put(endpoint, data, config);
};

// PATCH request
export const apiPatch = (endpoint, data, config = {}) => {
  return apiClient.patch(endpoint, data, config);
};

// DELETE request
export const apiDelete = (endpoint, config = {}) => {
  return apiClient.delete(endpoint, config);
};

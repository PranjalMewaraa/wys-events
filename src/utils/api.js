// src/utils/axiosClient.js
import axios from "axios";
// import { getToken } from "@clerk/clerk-js";

const api = axios.create({
  baseURL: "https://wysbackend.onrender.com/api", // Replace with your backend API base URL
});
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2VhNGQ3MmU2YWEyMmRlYzQ3NzJmMWMiLCJuYW1lIjoibWFpIGh1IGFkbWluIiwiZW1haWwiOiJhZG1pbnVkbWluQGdtYWlsLmNvbSIsImlhdCI6MTc0MzY2MTQyNywiZXhwIjoxNzQzNzQ3ODI3fQ.3S0E1Hh-IRocuEkk2K0E8pG_QtwHs3s80ikan8bwpgk";

// Automatically add token to Authorization header
// api.interceptors.request.use(async (config) => {
//   const token = await getToken({ template: "default" }); // Optional template
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;

//event

export const fetchEventById = async (eventId) => {
  try {
    const response = await api.get(`/events/${eventId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response.data);
    }
    throw error;
  }
};

//message api
export const fetchMessages = async (eventId) => {
  try {
    const response = await api.get(`/group/messages/${eventId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (
      response.data.messages &&
      Array.isArray(response.data.messages) &&
      response.data.messages.length > 0
    ) {
      return {
        messages: response.data.messages,
        groupId: response.data.messages[0].groupId, // Extract groupId
      };
    } else {
      console.warn("No messages found.");
      return { messages: [], groupId: null };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Error fetching messages:", error);
    }
    return { messages: [], groupId: null };
  }
};

export const sendMessage = async (groupId, message) => {
  if (!message.trim() || !groupId) return null;

  try {
    const response = await api.post(
      `/group/messages/send/${groupId}`,
      { content: message }, // Send the message in the request body
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.message; // Return the newly sent message
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Error sending message:", error);
    }
    return null;
  }
};

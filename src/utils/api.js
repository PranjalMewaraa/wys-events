import axios from "axios";
const api = axios.create({
  baseURL: "https://wysbackend.onrender.com/api",
});
const token = localStorage.getItem("accessToken");

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
//auth login & signup

export const getMatchedUsers = async () => {
  try {
    const res = await api.get(`/matching/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response.data);
    }
    throw error;
  }
};
export const getCompatibility = async (id) => {
  try {
    const res = await api.get(`/matching/compatibility/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response.data);
    }
    throw error;
  }
};
export const fetchUserByIdForMatching = async (id) => {
  try {
    const res = await api.get(`/matching/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response.data);
    }
    throw error;
  }
};
export const getEventsCreatedByUser = async () => {
  try {
    const response = await api.get(`/events/created`, {
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
export const fetchEvents = async () => {
  try {
    const response = await api.get(`/events`, {
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

export const eventRequest = async (eventId) => {
  try {
    const res = api.post(
      `/events/${eventId}/join`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response.data);
    }
    throw error;
  }
};

export const leaveEvent = async (eventId) => {
  try {
    const res = await api.post(
      `/events/${eventId}/leave`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios error (leave event):",
        error.response?.data || error.message
      );
    }
    throw error;
  }
};
export const cancelEvent = async (eventId) => {
  try {
    const res = await api.patch(
      `/events/${eventId}/cancel`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios error (cancel event):",
        error.response?.data || error.message
      );
    }
    throw error;
  }
};

//group api

export const fetchGroups = async (token) => {
  try {
    const res = await api.get("/group/my-groups", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data; // Axios automatically parses JSON
  } catch (error) {
    console.error("Failed to fetch groups", error);
    throw error;
  }
};

export const pendingRequest = async () => {
  try {
    const res = await api.get("/message/pending", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data.pendingRequests);
    return res.data.pendingRequests;
  } catch (error) {
    console.error("Failed to pending request", error);
    throw error;
  }
};

export const fetchFriends = async (token) => {
  try {
    const res = await api.get("/message/getAllFriends", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch friends", error);
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
      { content: message },
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

export const fetchDirectMessages = async (userId) => {
  try {
    const response = await api.get(`/message/conversation/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      messages: response.data.messages || [],
    };
  } catch (error) {
    console.error("Error fetching direct messages:", error);
    return { messages: [] };
  }
};

export const sendDirectMessage = async (userId, message) => {
  try {
    console.log("Sending direct message to:", userId);

    const response = await api.post(
      `/message/send/${userId}`,
      { content: message },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.message;
  } catch (error) {
    console.error("Error sending direct message:", error);
    return null;
  }
};

import axios from "axios";

const api = axios.create({
  baseURL: "https://wysbackend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token on each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    if (message.toLowerCase().includes("jwt expired")) {
      localStorage.removeItem("accessToken");
      window.location.href = "/signin";
    }

    return Promise.reject(error);
  }
);

// Matching APIs
export const getMatchedUsers = async () => {
  const res = await api.get(`/matching/`);
  return res.data;
};

export const getCompatibility = async (id) => {
  const res = await api.get(`/matching/compatibility/${id}`);
  return res.data.data;
};

export const fetchUserByIdForMatching = async (id) => {
  const res = await api.get(`/matching/${id}`);
  return res.data.data;
};

// Event APIs
export const getEventsCreatedByUser = async () => {
  const res = await api.get(`/events/created`);
  return res.data;
};

export const fetchEvents = async () => {
  const res = await api.get(`/events`);
  return res.data;
};

export const fetchEventById = async (eventId) => {
  const res = await api.get(`/events/${eventId}`);
  return res.data;
};

export const eventRequest = async (eventId) => {
  const res = await api.post(`/events/${eventId}/join`, {});
  return res.data;
};

export const leaveEvent = async (eventId) => {
  const res = await api.post(`/events/${eventId}/leave`, {});
  return res.data;
};

export const cancelEvent = async (eventId) => {
  const res = await api.patch(`/events/${eventId}/cancel`, {});
  return res.data;
};

export const getParticipantsData = async (eventId) => {
  const res = await api.get(`/events/${eventId}/participants`);
  return res.data;
};

export const updateRSVPStatus = async (eventId, rsvpStatus) => {
  const res = await api.patch(`/events/${eventId}/rsvp`, { rsvpStatus });
  return res.data;
};

export const rateEvent = async (eventId, { stars, reviewText }) => {
  const res = await api.post(`/events/rate/${eventId}`, { stars, reviewText });
  return res.data;
};

// Group APIs
export const fetchGroups = async () => {
  const res = await api.get("/group/my-groups");
  return res.data;
};

// Friend Request APIs
export const sendFriendRequest = async (userId, content) => {
  const res = await api.post(`/message/request/${userId}`, { content });
  return res.data;
};

export const acceptFriendRequest = async (userId) => {
  const res = await api.post(`/message/accept/${userId}`);
  return res.data;
};

export const pendingRequest = async () => {
  const res = await api.get("/message/pending");
  return res.data.pendingRequests;
};

export const fetchFriends = async () => {
  const res = await api.get("/message/getAllFriends");
  return res.data;
};

// Group Message APIs
export const fetchMessages = async (eventId) => {
  const res = await api.get(`/group/messages/${eventId}`);
  const messages = res.data.messages || [];
  const groupId = messages.length > 0 ? messages[0].groupId : eventId;
  return { messages, groupId };
};

export const sendMessage = async (groupId, message) => {
  if (!message.trim()) return null;
  const res = await api.post(`/group/messages/send/${groupId}`, {
    content: message,
  });
  return res.data.message;
};

// Direct Message APIs
export const fetchDirectMessages = async (userId) => {
  const res = await api.get(`/message/conversation/${userId}`);
  return { messages: res.data.messages || [] };
};

export const sendDirectMessage = async (userId, message) => {
  const res = await api.post(`/message/send/${userId}`, { content: message });
  return res.data.message;
};

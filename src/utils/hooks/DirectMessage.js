// utils/hooks/useDirectChat.js
import { useEffect, useState } from "react";
import { fetchDirectMessages, sendDirectMessage } from "../api";

export const useDirectChat = (userId) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userId) return;

    const loadMessages = async () => {
      const { messages } = await fetchDirectMessages(userId);
      setMessages(messages);
    };

    loadMessages();
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, [userId]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    const newMsg = await sendDirectMessage(userId, message);
    if (newMsg) {
      setMessages((prev) => [...prev, newMsg]);
      setMessage("");
    }
  };

  return {
    messages,
    message,
    setMessage,
    handleSendMessage,
  };
};

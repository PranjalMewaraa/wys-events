import { useEffect, useState } from "react";
import { fetchMessages, sendMessage } from "../api";

export const useGroupChat = (eventId, groupId) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch messages when eventId changes
  useEffect(() => {
    const loadMessages = async () => {
      const { messages } = await fetchMessages(eventId);
      setMessages(messages);
    };

    loadMessages();
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, [eventId]);

  // Function to send poll messages
  const triggerPollMessage = async (pollMessage) => {
    const newMessage = await sendMessage(groupId, pollMessage, {
      type: "poll",
    });
    if (newMessage) {
      setMessages((prev) => [...prev, newMessage]);
    }
  };

  // Send normal messages
  const handleSendMessage = async () => {
    if (!message.trim()) return;
    const newMessage = await sendMessage(groupId, message);
    if (newMessage) {
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
    }
  };

  return {
    messages,
    message,
    setMessage,
    handleSendMessage,
    triggerPollMessage,
  };
};

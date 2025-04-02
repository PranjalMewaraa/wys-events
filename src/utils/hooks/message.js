import { useEffect, useState } from "react";
import { fetchMessages, sendMessage } from "../api";

export const useChat = (eventId) => {
  const [messages, setMessages] = useState([]);
  const [groupId, setGroupId] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch messages when eventId changes
  useEffect(() => {
    const loadMessages = async () => {
      const { messages, groupId } = await fetchMessages(eventId);
      setMessages(messages);
      if (groupId) setGroupId(groupId);
    };

    loadMessages();
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, [eventId, setMessages]);

  // Send message and update Recoil state
  const handleSendMessage = async () => {
    if (!message.trim()) return;
    const newMessage = await sendMessage(groupId, message);
    if (newMessage) {
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
    }
  };

  return { messages, message, setMessage, handleSendMessage };
};

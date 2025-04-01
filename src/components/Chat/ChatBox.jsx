import React, { useEffect, useState } from "react";
import person1 from "../../assets/images/person-1.png";
import messageArrow from "../../assets/images/rectangle 246.svg";
import ChatNav from "./ChatNav";
import Modal from "./Modal";
import Popup from "./Popup";
import { useParams } from "react-router-dom";

const ChatBox = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [groupId, setGroupId] = useState(null);
  const sender=[
    {image:person1,name:"Jhone Doe",Message:"Random text about the event some more random "},
    {image:person1,name:"varun",Message:"Description about the the profile, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
]
  const API_URL = "https://wysbackend.onrender.com/api";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2VhNGQ3MmU2YWEyMmRlYzQ3NzJmMWMiLCJuYW1lIjoibWFpIGh1IGFkbWluIiwiZW1haWwiOiJhZG1pbnVkbWluQGdtYWlsLmNvbSIsImlhdCI6MTc0MzUxNTUwOSwiZXhwIjoxNzQzNjAxOTA5fQ.a5d035sOj6L3bgF-Qrvz7Hv32vL7Vj0qk_ePe81rTlY"
  // Change this if needed
  // const {eventId}=useParams();
  const eventId="67e54a94840201363f001288"
  // 🟢 Join Group Chat on Mount
  // useEffect(() => {
  //   const joinGroup = async () => {
  //     try {
  //       const res = await fetch(`${API_URL}/chat/join/${eventId}`, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         credentials: "include",
  //       });
  //       const data = await res.json();
  //       if (res.ok) {
  //         setGroupId(data.groupId);
  //       }
  //     } catch (error) {
  //       console.error("Error joining group:", error);
  //     }
  //   };

  //   joinGroup();
  // }, [eventId]);

  // 🟡 Fetch Messages Every 3 Seconds
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${API_URL}/group/messages/${eventId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
  
        if (!res.ok) {
          console.error("Failed to fetch messages:", res.status, res.statusText);
          return;
        }
  
        const data = await res.json();
        console.log("Fetched Data:", data);
  
        if (data.messages && Array.isArray(data.messages) && data.messages.length > 0) {
          setMessages(data.messages);
          console.log(data.messages)
          // Extract and set groupId from the first message
          const extractedGroupId = data.messages[0].groupId;
          setGroupId(extractedGroupId); // ✅ Set groupId here
          console.log("Extracted Group ID:", extractedGroupId);
        } else {
          console.warn("No messages found.");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
  
    fetchMessages(); // Initial fetch
  
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [eventId,groupId]); 

  // 🔴 Send a Message
  const handleSendMessage = async () => {
    if (!message.trim() || !groupId) return;

    try {
      const res = await fetch(`${API_URL}/group/messages/send/${groupId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message }),
        "Authorization": `Bearer ${token}`,
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [...prev, data.message]); // Update UI instantly
        setMessage(""); 
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Debugging log: check when modals are open

  return (
    <div className="w-full relative">
      {/* Overlay when modal or popup is open */}
      {(isModalOpen || isPopupOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm"></div>
      )}

      {/* Chat Navigation */}
      <ChatNav setIsModalOpen={setIsModalOpen} />

      {/* Chat Messages */}
      <div className="p-4 space-y-4 overflow-y-auto h-80">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end ${msg.senderId === "your-user-id" ? "justify-end" : "justify-start"}`}>
            {msg.senderId !== "your-user-id" && (
              <img className="w-[20px] h-[20px] self-end mr-2" src={person1} alt="User" />
            )}
            <div
              className={`p-3 rounded-xl ${msg.senderId === "your-user-id" ? "bg-[#F38E1C] text-white" : "bg-[#333333] text-white"}`}
            >
              <p className="text-sm">{msg.groupName}</p>
              <p className="text-xs">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔴 FIX: Hide Input Box when Modal/Popup is Open */}
      {!(isModalOpen || isPopupOpen) && (
        <div className="fixed w-full bottom-0">
          <div className="flex items-center border border-gray-300 bg-white px-4 py-2 shadow-sm">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Send a message..."
              className="flex-grow outline-none text-gray-700 text-sm"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 text-blue-500 hover:text-blue-600 focus:outline-none transition-colors"
            >
              <img src={messageArrow} alt="Send Message" />
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onShowPopup={() => setIsPopupOpen(true)}
          className="z-[60]"
        />
      )}

      {/* Popup */}
      {isPopupOpen && (
        <Popup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          className="z-[60]"
        />
      )}
    </div>
  );
};

export default ChatBox;

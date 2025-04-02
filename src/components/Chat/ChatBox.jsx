import React, { useEffect, useRef, useState } from "react";
import person1 from "../../assets/images/person-1.png";
import messageArrow from "../../assets/images/rectangle 246.svg";
import ChatNav from "./ChatNav";
import Modal from "./Modal";
import Popup from "./Popup";
import { useParams } from "react-router-dom";
import { decodeToken } from "../../utils/helper";
import { useChat } from "../../utils/hooks/message";

const ChatBox = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
 
  const eventId="67e54a94840201363f001288"

  const { messages, message, setMessage, handleSendMessage } = useChat(eventId);

  const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2VhNGQ3MmU2YWEyMmRlYzQ3NzJmMWMiLCJuYW1lIjoibWFpIGh1IGFkbWluIiwiZW1haWwiOiJhZG1pbnVkbWluQGdtYWlsLmNvbSIsImlhdCI6MTc0MzUxNTUwOSwiZXhwIjoxNzQzNjAxOTA5fQ.a5d035sOj6L3bgF-Qrvz7Hv32vL7Vj0qk_ePe81rTlY";
  const userId = decodeToken(token)?._id;

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]); 
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };


  return (
    <div className="w-full h-screen flex flex-col">
    {/* Chat Navigation */}
    <ChatNav setIsModalOpen={setIsModalOpen} 
    eventId={eventId}
    />

    {/* Scrollable Chat Messages */}
    <div
      ref={chatContainerRef}
      className="flex-1 overflow-y-auto px-4 py-2 space-y-3"
      style={{ scrollBehavior: "smooth" }} // Ensures smooth scrolling
    >
      {messages.map((item, index) =>
        item.senderId === userId ? (
          <div key={item.id || index} className="flex justify-end">
            <div className="bg-[#F38E1C] text-white p-3 rounded-xl rounded-br-none w-max max-w-xs">
              {item.content}
            </div>
          </div>
        ) : (
          <div key={item.id || index} className="flex items-end gap-2">
            <img className="w-5 h-5" src={person1} alt="User" />
            <div className="bg-[#333333] p-3 rounded-xl rounded-bl-none text-white w-max max-w-xs">
              <p className="text-[#F38E1C] text-sm">{item.groupName}</p>
              <p className="text-xs">{item.content}</p>
            </div>
          </div>
        )
      )}
    </div>

    {/* Message Input */}
    {!(isModalOpen || isPopupOpen) && (
      <div className="w-full bg-white px-4 py-2 border-t border-gray-300">
        <div className="flex items-center">
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
            className="ml-2 text-blue-500 hover:text-blue-600 transition-colors"
          >
            <img src={messageArrow} alt="Send Message" />
          </button>
        </div>
      </div>
    )}
  </div>
  );
};
   
  


export default ChatBox;

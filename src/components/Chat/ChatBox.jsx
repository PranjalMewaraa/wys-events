import React, { useEffect, useRef, useState } from "react";
import messageArrow from "../../assets/images/rectangle_246.svg";
import ChatNav from "./ChatNav";
import Modal from "./Modal";
import Popup from "./Popup";
import MessageRenderer from "./MessageRenderer";
import { useParams } from "react-router-dom";
import { decodeToken } from "../../utils/helper";
import { useGroupChat } from "../../utils/hooks/Groupmessage";
import { useDirectChat } from "../../utils/hooks/DirectMessage";

const ChatBox = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { eventId, userId, groupId } = useParams();
  const isGroupChat = !!eventId;

  const {
    messages,
    message,
    setMessage,
    handleSendMessage,
    loading,
  } = isGroupChat
    ? useGroupChat(eventId, groupId)
    : useDirectChat(userId);

  const token = localStorage.getItem("accessToken");
  const Id = decodeToken(token)?._id;
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

  const parseMessage = (msg) => {
    try {
      return JSON.parse(msg);
    } catch {
      return { type: "text", content: msg };
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <ChatNav setIsModalOpen={setIsModalOpen} eventId={eventId} groupId={groupId} />

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-2 space-y-3"
        style={{ scrollBehavior: "smooth" }}
      >
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          messages.map((item, index) => {
            const parsedMessage = parseMessage(item.content);
            const isSentByCurrentUser = isGroupChat
              ? item.senderId._id === Id
              : item.senderId === Id;

            return isSentByCurrentUser ? (
              <div key={item._id || index} className="flex justify-end">
                <div className="bg-[#F38E1C] text-white p-3 rounded-xl rounded-br-none w-max max-w-xs">
                  <MessageRenderer message={parsedMessage}
                  eventId={eventId} 
                  />
                </div>
              </div>
            ) : (
              <div key={item._id || index} className="flex items-end gap-2">
                {isGroupChat && (
                  <img
                    className="w-5 h-5 rounded-full object-cover"
                    src={item.senderId.avatar}
                    alt={item.senderId.name}
                  />
                )}
                <div className="bg-[#333333] p-3 rounded-xl rounded-bl-none text-white w-max max-w-xs">
                  {isGroupChat && (
                    <p className="text-[#F38E1C] text-sm">{item.senderId.name}</p>
                  )}
                  <MessageRenderer message={parsedMessage}
                  eventId={eventId}
                   />
                </div>
              </div>
            );
          })
        )}
      </div>

      {!(isModalOpen || isPopupOpen) && !loading && (
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

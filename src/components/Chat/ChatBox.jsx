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
  const decodeToken = (token) => {
    try {
      const base64Url = token.split(".")[1]; // Get payload part
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };
  const decoded = decodeToken(token);
  const userId = decoded?._id;

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
          const extractedGroupId = data.messages[0].groupId;
          setGroupId(extractedGroupId); // ✅ Set groupId here
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
        headers: { "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,

         },
        body: JSON.stringify({ content: message }),
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
    <div>
 <div className="w-full h-auto">

{/* Chat Navigation */}
<ChatNav setIsModalOpen={setIsModalOpen} />

{
      messages.map((item,index)=>(
        item.senderId===userId? (<div className='flex flex-col items-end gap-5 mr-3 mb-3'>
        <div className='w-3/5 flex flex-col gap-0.5 bg-[#F38E1C] abeezee-regular p-3 rounded-xl rounded-br-none '>
            <p className='text-white text-[10px]'>{item.content}</p>
        </div>
        </div>):
          (<div key={item.id || index} className='w-full flex mb-3 mt-5 pl-5'>
          <img className='w-[20px] h-[20px] self-end' src={person1}/>
          <div className='w-3/5 flex flex-col gap-0.5 bg-[#333333] abeezee-regular p-3 rounded-xl rounded-bl-none'>
              <p className='text-[#F38E1C] text-base leading-6'>{item.groupName}</p>
              <p className='text-white text-[10px]'>{item.content}</p>
          </div>
          
      </div>)
      ))
  }
  
 

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
    </div>
   
  );
};

export default ChatBox;

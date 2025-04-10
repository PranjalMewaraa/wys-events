import React, { useState } from "react";
import ChatPopup from "./ChatPopup";
import useEventDetails from "../../utils/hooks/event";

const MessageRenderer = ({ message,eventId }) => {
  const { type, content } = message;
  const [isPopupOpen,setIsPopupOpen]=useState(false);
  const {userRole}=useEventDetails(eventId);
  switch (type) {
    case "text":
      return <p>{content}</p>;

    case "rsvp":
      return (
        <div className="space-y-1">
          <p className=" abeezee-regular text-[14px] text-[#FFFFFF]">{content.question}</p>
          {content.attendees && (
            <div className="flex space-x-2">
              {content.attendees.map((a, i) => (
                <div key={i} className="">
                <img
                  src={a.avatar}
                  className="w-6 h-6 rounded-full border-2 border-white"
                />
                <p>{a.name}</p>
                </div>
                
              ))}
            </div>
          )}
          {userRole==="seeker" && (
            <button className="mt-1 text-xs border border-[#F38E1C]  text-[#F38E1C] rounded-3xl  px-3 py-2  bg-transparent"

            onClick={()=>{
              setIsPopupOpen(true)
            }}
             >
              {content.buttonText}
            </button>
            
          )
          }
          {isPopupOpen &&(
            <ChatPopup
           isOpen={isPopupOpen}
           onClose={()=>setIsPopupOpen(false)}
           eventId={eventId}
           isPopupOpen={isPopupOpen}
           />
           
          )}
        </div>
      );

    case "review":
      return (
        <div className="space-y-1">
          <p className="font-medium text-orange-500">{content.question}</p>
          {content.buttonVisible && (
            <button className="mt-1 text-xs border border-[#F38E1C]  text-[#F38E1C] rounded-3xl  px-3 py-2  bg-transparent" onClick={()=>{setIsPopupOpen(true)
            }}>

              {content.buttonText}
            </button>
          )}
          {isPopupOpen &&(
            <ChatPopup
           isOpen={isPopupOpen}
           onClose={()=>setIsPopupOpen(false)}
           eventId={eventId}
           isPopupOpen={isPopupOpen}
           />
           
          )}
        
        </div>
      );

    default:
      return <p>Unsupported message type</p>;
  }
};

export default MessageRenderer;

import React, { useEffect, useState } from "react";
import useEventDetails from "../../utils/hooks/event";

const Modal = ({ isOpen, onClose, onShowPopup,eventId }) => {
const {userRole } = useEventDetails(eventId);

  const [isEventOver, setEventOver] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (!event.target.closest(".modal-content")) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen, onClose]);




  if (!isOpen) return null;



  return (
      <div className="fixed top-[450px] right-0 left-0 flex ">
      <div
        className="modal-content w-full bg-white rounded-t-2xl shadow-lg border border-transparent drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)] p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="text-center text-lg font-medium border-b border-gray-200 pb-2 cursor-pointer"
          onClick={() => {
            onClose(); // Close modal
            onShowPopup(); // Open Popup
          }}
        >
          {isEventOver 
            ? userRole === "host" 
              ? "Ask for Review" 
              : "Share Your Experience"
            : userRole === "host" 
              ? "Send RSVP" 
              : "Are you attending?"}
        </div>
        <button className="w-full py-4 text-center text-black hover:bg-gray-100 border-b border-gray-200">
          View Experience
        </button>
        <button className="w-full py-4 text-center text-black hover:bg-gray-100">
          {userRole === "host" ? "Close Listing" : "Leave Experience"}
        </button>
      </div>
    </div>
    
  );
};

export default Modal;

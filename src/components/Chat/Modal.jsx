import React, { useEffect } from "react";
import useEventDetails from "../../utils/hooks/event";
import { useGroupChat } from "../../utils/hooks/Groupmessage";
import { cancelEvent, leaveEvent } from "../../utils/api"; // Import the APIs
import { Link } from "react-router-dom";

const Modal = ({ isOpen, onClose, onShowPopup, eventId }) => {
  const { userRole, isEventOver } = useEventDetails(eventId);
  const { triggerPollMessage } = useGroupChat(eventId);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (!event.target.closest(".modal-content")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrimaryAction = () => {
    onClose(); // Close modal

    if (userRole === "host") {
      if (!isEventOver) {
        // Host before event: Send RSVP poll in chat
        triggerPollMessage("Have you made up your mind about attending?");
      } else {
        // Host after event: First open review popup
        onShowPopup();
      }
    } else {
      // Seeker: Just open popup, no poll in chat
      onShowPopup();
    }
  };

  const handleSecondaryAction = async () => {
    try {
      if (userRole === "host") {
        await cancelEvent(eventId);
        alert("Event has been cancelled successfully.");
      } else {
        await leaveEvent(eventId);
        alert("You have left the event.");
      }
      onClose();
    } catch (error) {
      console.error("Error handling event action:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed top-[510px] right-0 left-0 flex">
      <div
        className="modal-content w-full bg-white rounded-t-2xl shadow-lg border border-transparent drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)] p-4"
        onClick={(e) => e.stopPropagation()}
      >
       <Link to={`/event/${eventId}`}>
       <button className="w-full py-3 text-center text-black hover:bg-gray-100 border-b border-gray-200">
          View Experience
        </button>
       </Link> 
        <button
          className="w-full py-3 text-center text-black hover:bg-gray-100"
          onClick={handleSecondaryAction}
        >
          {userRole === "host" ? "Close Listing" : "Leave Experience"}
        </button>
      </div>
    </div>
  );
};

export default Modal;

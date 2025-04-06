import React, { useEffect, useState } from "react";
import useEventDetails from "../../utils/hooks/event";
import { useGroupChat } from "../../utils/hooks/Groupmessage";

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

  return (
    <div className="fixed top-[510px] right-0 left-0 flex">
      <div
        className="modal-content w-full bg-white rounded-t-2xl shadow-lg border border-transparent drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)] p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* <div
          className="text-center text-lg font-medium border-b border-gray-200 pb-2 cursor-pointer"
          onClick={handlePrimaryAction}
        >
          {isEventOver
            ? userRole === "host"
              ? "Ask for Review"
              : "Share Your Experience"
            : userRole === "host"
            ? "Send RSVP"
            : "Are you attending?"}
        </div> */}

        <button className="w-full py-3 text-center text-black hover:bg-gray-100 border-b border-gray-200">
          View Experience
        </button>
        <button className="w-full py-3 text-center text-black hover:bg-gray-100">
          {userRole === "host" ? "Close Listing" : "Leave Experience"}
        </button>
      </div>
    </div>
  );
};

export default Modal;

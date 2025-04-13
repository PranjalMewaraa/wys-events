// Modal.js
import React, { useEffect, useState } from "react";
import useEventDetails from "../../utils/hooks/event";
import { useGroupChat } from "../../utils/hooks/Groupmessage";
import { cancelEvent, leaveEvent } from "../../utils/api";
import { Link } from "react-router-dom";
import { sendReviewMessage, sendRSVPMessage } from "../../utils/structureMessages";

const Modal = ({ isOpen, onClose, onShowPopup, eventId, groupId }) => {
  
  const { userRole, isEventOver, event } = useEventDetails(eventId);
  const { triggerPollMessage } = useGroupChat(eventId, groupId);
  const [rsvpStatus, setRsvpStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { participants, loading } = useParticipants(eventId);

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("userID");

    if (event && loggedInUserId) {
      const matched = event?.participants?.find(
        (p) => p?.user?._id === loggedInUserId
      );
      setRsvpStatus(matched?.rsvpStatus || null);
      setIsLoading(false);
    }
  }, [event]);

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


  const handlePrimaryAction = async () => {
    if (loading) return;
    onClose();

    if (userRole === "host") {
      if (!isEventOver) {
        if (participants.length === 0) return;
        sendRSVPMessage(triggerPollMessage, eventId);
      } else {
        sendReviewMessage(triggerPollMessage,userRole)
      }
    } else {
      onShowPopup();
    }
  };

  const handleSecondaryAction = async () => {
    if (isLoading) return;
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

  const primaryActionText = isLoading
    ? "Loading..."
    : isEventOver
    ? userRole === "host"
      ? "Ask for Review"
      : "Share Your Experience"
    : userRole === "host"
    ? "Send RSVP"
    : rsvpStatus === "yes"
    ? "You are going"
    : "Are you attending?";

  return (
    <div className="fixed top-[470px] md:top-[570px] right-0 left-0 flex">
      <div
        className="modal-content w-full bg-white rounded-t-2xl shadow-lg border border-transparent drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)] p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`text-center text-lg font-medium border-b border-gray-200 pb-2 cursor-pointer ${
            isLoading ? "text-gray-400 cursor-not-allowed" : ""
          }`}
          onClick={
            !isLoading && primaryActionText !== "You are going"
              ? handlePrimaryAction
              : null
          }
        >
          {primaryActionText}
        </div>

        <Link to={`/event/${eventId}`}>
          <button
            className="w-full py-3 text-center text-black hover:bg-gray-100 border-b border-gray-200"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "View Experience"}
          </button>
        </Link>

        <button
          className="w-full py-3 text-center text-black hover:bg-gray-100"
          onClick={!isLoading ? handleSecondaryAction : null}
          disabled={isLoading}
        >
          {isLoading
            ? "Loading..."
            : userRole === "host"
            ? "Close Listing"
            : "Leave Experience"}
        </button>
      </div>
    </div>
  );
};

export default Modal;


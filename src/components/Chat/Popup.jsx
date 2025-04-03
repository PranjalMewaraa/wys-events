import React, { useEffect, useState } from 'react';
import ReviewPopUp from './ReviewPopup';
import ConfirmPopup from './ConfirmPopup';
import useEventDetails from '../../utils/hooks/event';
import { useChat } from "../../utils/hooks/message";

const Popup = ({ isOpen, onClose, eventId }) => {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showReviewPopup, setShowReviewPopup] = useState(false);

  // Mock user role and event status (Replace with hook when needed)
  const { userRole, isEventOver } = useEventDetails(eventId);
  const { triggerPollMessage } = useChat(eventId); // Hook to send messages in chat

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (!event.target.closest(".popup-content")) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen, onClose]);

  
  const handleExperienceYes = () => {
    triggerPollMessage("Share your review with the button below!"); // Pass a string, not an object
  
    if (userRole !== "host") {
      setShowReviewPopup(true); // Open review modal only for attendees
    } else {
      setTimeout(() => {
        onClose(); // Close popup for host after a small delay
      }, 300);
    }
  };
  return (
    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
      {showReviewPopup ? (
        <ReviewPopUp onClose={onClose} />
      ) : isEventOver ? (
         <div className="fixed inset-0 flex items-center justify-center p-4  min-h-screen">
          <div className="bg-white rounded-lg shadow-lg w-full px-6 py-5">
            <p className="poppins-semibold text-center text-lg mb-5">
              {userRole === "host" ? "Ask for" : "Share your"} <span className="text-orange-400">Experience</span>
            </p>
            <p className="abeezee-regular text-center text-lg font-semibold mb-5">
              Did the event happen?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-6 py-2 border border-orange-400 text-orange-500 rounded-full font-medium hover:bg-orange-50 transition-colors"
                onClick={handleExperienceYes} // Call function to send message and open modal (if needed)
              >
                Yes
              </button>
              <button
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors"
                onClick={onClose}
              >
                No
              </button>
            </div>
          </div>
        </div>
      ) : !showConfirmPopup ? (
        <div className="fixed inset-0 flex items-center justify-center p-4 min-h-screen">
          <div className="bg-white rounded-lg shadow-lg w-full px-6 py-5">
            <p className="poppins-semibold text-center text-lg font-medium mb-5">
              Are you <span className="text-orange-400 font-semibold">attending</span>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-6 py-2 border border-orange-400 text-orange-500 rounded-full font-medium hover:bg-orange-50 transition-colors"
                onClick={onClose}
              >
                Yes
              </button>
              <button
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors"
                onClick={() => setShowConfirmPopup(true)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      ) : (
        <ConfirmPopup onClose={onClose} />
      )}
    </div>
  );
};

export default Popup;

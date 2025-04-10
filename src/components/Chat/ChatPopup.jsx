import React, { useEffect, useState } from 'react';
import ReviewPopUp from './ReviewPopup';
import ConfirmPopup from './ConfirmPopup';
import useEventDetails from '../../utils/hooks/event';
import { useGroupChat } from "../../utils/hooks/Groupmessage";
import { updateRSVPStatus } from '../../utils/api';
import { sendReviewMessage } from '../../utils/structureMessages';

const ChatPopup = ({ isOpen, onClose, eventId}) => {
  

  const [showReviewPopup, setShowReviewPopup] = useState(false);

  // Mock user role and event status (Replace with hook when needed)
  const { userRole, isEventOver} = useEventDetails(eventId);
  const { triggerPollMessage } = useGroupChat(eventId); // Hook to send messages in chat
  const handleRSVP = async (status) => {
    try {
      await updateRSVPStatus(eventId, status);
      onClose(); // Close the popup after RSVP
    } catch (err) {
      console.error("Failed to update RSVP status", err);
      alert("Couldn't update RSVP. Please try again.");
    }
  };
  useEffect(() => {
    if (!isOpen) return;

   
  }, [isOpen, onClose]);

  
  const handleExperienceYes = () => {

    sendReviewMessage(triggerPollMessage,userRole)
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
        <ReviewPopUp onClose={onClose} 
        eventId={eventId}
        />
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
      ):(
        <div className="fixed inset-0 flex items-center justify-center p-4 min-h-screen">
        <div className="bg-white rounded-lg shadow-lg w-full px-6 py-5">
          <p className="poppins-semibold text-center text-lg font-medium mb-5 text-black">  
            Are you <span className="text-orange-400 font-semibold">attending</span>?
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="px-6 py-2 border border-orange-400 text-orange-500 rounded-full font-medium hover:bg-orange-50 transition-colors"
              onClick={() => handleRSVP("yes")} // ✅ Update RSVP here
            >
              Yes
            </button>
            <button
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors"
              onClick={() => {
                onClose()
                handleRSVP("no")
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default ChatPopup;

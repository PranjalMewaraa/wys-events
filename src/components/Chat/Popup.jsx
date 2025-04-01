import React, { useEffect, useState } from 'react';
import ReviewPopUp from './ReviewPopup';
import ConfirmPopup from './ConfirmPopup';

const Popup = ({ isOpen, onClose }) => {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [userType, setUserType] = useState("host");
  const [isEventOver, setEventOver] = useState(true);
  const [showReviewPopup, setShowReviewPopup] = useState(false); // Change to false initially

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

  return (
    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
      {showReviewPopup ? (
        <ReviewPopUp onClose={onClose}/>
      ) : isEventOver ? (
        userType === "host" ? (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-100 p-4 top-[350px]">
            <div className="bg-white rounded-lg shadow-lg w-full px-6 py-5">
              <p className="poppins-semibold text-center text-lg mb-5">
                Ask for <span className="text-orange-400">review</span>
              </p>
              <p className="abeezee-regular text-center text-lg font-semibold mb-5">
                Did the event happen?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="px-6 py-2 border border-orange-400 text-orange-500 rounded-full font-medium hover:bg-orange-50 transition-colors"
                  onClick={() => setShowReviewPopup(true)} // Fixed issue
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
        ) : (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-100 p-4 top-[350px]">
            <div className="bg-white rounded-lg shadow-lg w-full px-6 py-5">
              <p className="poppins-semibold text-center text-lg  mb-5">
                Share your <span className="text-orange-400">Experience</span>
              </p>
              <p className="abeezee-regular text-center text-lg font-semibold mb-5">
                Did the event happen?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="px-6 py-2 border border-orange-400 text-orange-500 rounded-full font-medium hover:bg-orange-50 transition-colors"
                  onClick={() => setShowReviewPopup(true)} // Fixed issue
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
        )
      ) : showConfirmPopup === false ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 p-4 top-[350px]">
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
        <ConfirmPopup onClose={onClose}/>
      )}
    </div>
  );
};

export default Popup;

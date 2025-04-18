import React, { useState } from "react";
import arrow from "../../assets/images/Arrow.svg";
import dots from "../../assets/images/dots.svg";
import Modal from "./Modal";
import Popup from "./Popup";
import { useLocation } from "react-router-dom";
import useEventDetails from "../../utils/hooks/event";

const ChatNav = ({ eventId,groupId }) => {
  const location = useLocation();
  const { chatDetails } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const {event}=useEventDetails(eventId)
  return (
    <div className="border border-transparent bg-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)] p-4">
      <div className="w-full flex items-center justify-between px-4">
        {/* Left: Back button + Chat Details */}
        <div className="flex items-center gap-16">
          <button onClick={() => window.history.back()}>
            <img src={arrow} alt="Back" />
          </button>

          {/* Chat Details */}
          <div className="flex gap-2 items-center">
            <img src={chatDetails?.image} alt="" className="w-8 h-8" />
            <div className="flex flex-col gap-0.5">
              <p className="abeezee-regular text-base leading-[100%] text-black">
                {chatDetails?.name || "Group Name"}
              </p>
              {/* <p className="abeezee-regular text-[12px] text-[#757575]">
                {chatDetails?.participants || "Participants info"}
              </p> */}
            </div>
          </div>
        </div>

        {/* Right: Options button (only for group chat) */}
        {eventId && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            <img src={dots} alt="Options" />
          </button>
        )}
      </div>

      {/* Modal and Popup */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onShowPopup={() => {
            setIsPopupOpen(true);
          }}
          eventId={eventId}
          groupId={groupId}

        />
      )}

      {isPopupOpen && (
        <Popup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          eventId={eventId}
        />
      )}
    </div>
  );
};

export default ChatNav;

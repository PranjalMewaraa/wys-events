import React, { useState } from "react";
import arrow from "../assets/images/Arrow.svg";
import scene from "../assets/images/tripImg1.svg";
import dots from "../assets/images/dots.svg";
import Modal from "./Modal";
import Popup from "./Popup";

const ChatNav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="border border-transparent bg-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)] p-4">
      <div className="w-full flex gap-10 items-center justify-evenly">
        <button>
          <img src={arrow} />
        </button>
        <div className="flex gap-2">
          <img src={scene} />
          <div className="flex flex-col gap-0.5">
            <p className="abeezee-regular text-base leading-[100%] text-black">
              Himalayas Trek
            </p>
            <p className="abeezee-regular text-[12px] text-[#757575]">
              3 out of 5 are going
            </p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
        >
          <img src={dots} />
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onShowPopup={() => {
            setIsPopupOpen(true);
          }}
        />
      )}

      {/* Popup */}
      {isPopupOpen && <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default ChatNav;

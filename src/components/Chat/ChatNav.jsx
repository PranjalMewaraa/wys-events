import React, { useState } from "react";
import arrow from "../../assets/images/Arrow.svg";
import dots from "../../assets/images/dots.svg";
import Modal from "./Modal";
import Popup from "./Popup";
import { useLocation } from "react-router-dom";


// const ChatNav = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);

//   return (
//     <div className="border border-transparent bg-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)] p-4">
//       <div className="w-full flex gap-10 items-center justify-evenly">
//         <button>
//           <img src={arrow} />
//         </button>
//         <div className="flex gap-2">
//           <img src={scene} />
//           <div className="flex flex-col gap-0.5">
//             <p className="abeezee-regular text-base leading-[100%] text-black">
//               Himalayas Trek
//             </p>
//             <p className="abeezee-regular text-[12px] text-[#757575]">
//               3 out of 5 are going
//             </p>
//           </div>
//         </div>
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             setIsModalOpen(true);
//           }}
//         >
//           <img src={dots} />
//         </button>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <Modal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           onShowPopup={() => {
//             setIsPopupOpen(true);
//           }}
//         />
//       )}

//       {/* Popup */}
//     </div>
//   );
// };

// export default ChatNav;

// ChatNav.jsx


const ChatNav = () => {
  const location = useLocation();
  const { chatDetails } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="border border-transparent bg-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)] p-4">
      <div className="w-full flex gap-10 items-center justify-evenly">
        {/* Back button */}
        <button onClick={() => window.history.back()}>
          <img src={arrow} alt="Back" />
        </button>
        
        {/* Chat Details */}
        <div className="flex gap-2">
          <img src={chatDetails?.image} alt="Group" className="w-8 h-8" />
          <div className="flex flex-col gap-0.5">
            <p className="abeezee-regular text-base leading-[100%] text-black">
              {chatDetails?.name || "Group Name"}
            </p>
            <p className="abeezee-regular text-[12px] text-[#757575]">
              {chatDetails?.participants || "Participants info"}
            </p>
          </div>
        </div>

        {/* Options button */}
        <button onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(true);
        }}>
          <img src={dots} alt="Options" />
        </button>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onShowPopup={() => {
            setIsPopupOpen(true);
          }}
        />
      )}

      {/* Modal and Popup components */}
           {isPopupOpen && <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />}

    </div>
  );
};

export default ChatNav;

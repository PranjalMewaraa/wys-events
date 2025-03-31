import React, { useEffect, useState } from 'react'

const Popup = ({ isOpen, onClose }) => {
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
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
    <div className='popup-content'
    onClick={(e) => e.stopPropagation()}

    >
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 p-4 top-[350px]">
      <div className="bg-white rounded-lg shadow-lg w-full px-6 py-5">
        <p className="text-center text-lg font-medium mb-5">
          Are you <span className="text-orange-400 font-semibold">attending</span>?
        </p>
        
        <div className="flex justify-center gap-4">
          <button className="px-6 py-2 border border-orange-400 text-orange-500 rounded-full font-medium hover:bg-orange-50 transition-colors" onClick={onClose}>
            Yes
          </button>
          
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors" onClick={()=>setShowConfirmPopup(true)}>
            No
          </button>
        </div>
      </div>
    </div>
    {showConfirmPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 p-4 top-[350px]">
        <div className="bg-white rounded-lg shadow-lg w-full px-6 py-5">
          <p className="text-center text-lg font-medium mb-5">
            Want to <span className="text-orange-400 font-semibold">leave experience</span>?
          </p>
          
          <div className="flex justify-center gap-4">
            <button className="px-6 py-2 border border-orange-400 text-orange-500 rounded-full font-medium hover:bg-orange-50 transition-colors" onClick={onClose}>
              Yes
            </button>
            
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors" >
              No
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
    
  )
}

export default Popup
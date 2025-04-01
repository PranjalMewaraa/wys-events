import React from 'react'

const ConfirmPopup = ({onClose}) => {
  return (
    <div>  
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 p-4 top-[350px]">
          <div className="bg-white rounded-lg shadow-lg w-full px-6 py-5">
            <p className="poppins-semibold text-center text-lg font-medium mb-5">
              Want to leave <span className="text-orange-400 font-semibold">experience</span>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-6 py-2 border border-orange-400 text-orange-500 rounded-full font-medium hover:bg-orange-50 transition-colors"
                onClick={onClose}
              >
                Yes
              </button>
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors">
                No
              </button>
            </div>
          </div>
        </div>

    </div>
  )
}

export default ConfirmPopup
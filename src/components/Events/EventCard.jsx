import React from "react";
import { BsCalendar, BsCalendarDate, BsThreeDots } from "react-icons/bs";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { FiTarget } from "react-icons/fi";
import { MdDateRange, MdLocationOn } from "react-icons/md";

function EventCard() {
  return (
    <div className="flex overflow-hidden flex-col h-72 drop-shadow-xl rounded-xl w-full max-w-md bg-white">
      <img
        src="https://imgs.search.brave.com/Ah4hMz04IJ9Ncii-qAm0qbYmbCSl4MkNgTVHNBI9yF8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9hL2E5L0hp/a2luZ190b190aGVf/SWNlX0xha2VzLl9T/YW5fSnVhbl9OYXRp/b25hbF9Gb3Jlc3Ql/MkNfQ29sb3JhZG8u/anBnLzk2MHB4LUhp/a2luZ190b190aGVf/SWNlX0xha2VzLl9T/YW5fSnVhbl9OYXRp/b25hbF9Gb3Jlc3Ql/MkNfQ29sb3JhZG8u/anBn"
        alt="hiking"
        className="h-1/2"
      />
      <div className="w-full h-1/2 flex-col gap-4 p-4">
        <div className="flex text-2xl mb-4 items-center justify-between w-full">
          <p>Himalaya Trek</p>
          <BsThreeDots />
        </div>
        <div className="flex flex-col gap-2">
          <p className="flex text-sm gap-2 items-center">
            <MdDateRange size={18} />
            26 Jun 2025 • 08:45 PM
          </p>
          <p className="flex text-sm gap-2 items-center">
            <MdLocationOn size={18} />
            Praygraj, Uttarakhand
          </p>
          <div className="flex justify-between">
            <p className="flex text-xs gap-2 items-center">
              <FiTarget size={18} />
              <span className="text-green-600 text-xs">2 slots available</span>
            </p>
            <p className="flex text-base gap-2 items-center">
              <FaMoneyBill1Wave size={18} />
              Rs 3000 per person
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;

import React from "react";
import { BsCalendar, BsCalendarDate, BsThreeDots } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";

function EventCard() {
  return (
    <div className="flex overflow-hidden flex-col h-96 border border-black rounded-xl w-full max-w-md bg-white">
      <img
        src="https://imgs.search.brave.com/Ah4hMz04IJ9Ncii-qAm0qbYmbCSl4MkNgTVHNBI9yF8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9hL2E5L0hp/a2luZ190b190aGVf/SWNlX0xha2VzLl9T/YW5fSnVhbl9OYXRp/b25hbF9Gb3Jlc3Ql/MkNfQ29sb3JhZG8u/anBnLzk2MHB4LUhp/a2luZ190b190aGVf/SWNlX0xha2VzLl9T/YW5fSnVhbl9OYXRp/b25hbF9Gb3Jlc3Ql/MkNfQ29sb3JhZG8u/anBn"
        alt="hiking"
        className="h-1/2"
      />
      <div className="w-full h-1/2 flex-col gap-4 p-4">
        <div className="flex text-xl mb-4 items-center justify-between w-full">
          <p>Himalaya Trek</p>
          <BsThreeDots />
        </div>
        <p className="flex text-sm gap-4 items-center">
          <BsCalendarDate size={16} />
          26 Jun 2025 - 08:45 PM
        </p>
        <p className="flex text-sm gap-4 items-center">
          <MdLocationOn size={16} />
          Praygraj, Uttarakhand
        </p>
      </div>
    </div>
  );
}

export default EventCard;

import React from "react";
import { BsCalendar, BsCalendarDate, BsThreeDots } from "react-icons/bs";
import { CiStar } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { FaMoneyBill1Wave, FaStar } from "react-icons/fa6";
import { FiTarget } from "react-icons/fi";
import { MdDateRange, MdLocationOn } from "react-icons/md";
import Layout from "../../Layout/Layout";
import LayoutInnerMain from "../../Layout/LayoutInner";
import useEventDetails, { useEvents } from "../../utils/hooks/event";
import { useParams } from "react-router-dom";

const EventDetail = () => {
  const{eventId}=useParams()
  const {event}=useEventDetails(eventId);
  return (
    <Layout>
      <LayoutInnerMain>
        {event && (
          <div className="flex overflow-hidden pb-28 p-4 flex-col h-fit  rounded-xl max-w-7xl  bg-white">
          <img
            src="https://imgs.search.brave.com/Ah4hMz04IJ9Ncii-qAm0qbYmbCSl4MkNgTVHNBI9yF8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9hL2E5L0hp/a2luZ190b190aGVf/SWNlX0xha2VzLl9T/YW5fSnVhbl9OYXRp/b25hbF9Gb3Jlc3Ql/MkNfQ29sb3JhZG8u/anBnLzk2MHB4LUhp/a2luZ190b190aGVf/SWNlX0xha2VzLl9T/YW5fSnVhbl9OYXRp/b25hbF9Gb3Jlc3Ql/MkNfQ29sb3JhZG8u/anBn"
            alt="hiking"
            className="h-1/2 max-h-72 rounded-xl"
          />
          <div className="w-full h-1/2 flex-col gap-4 py-4">
            <div className="flex text-2xl mb-4 items-center justify-between w-full">
              <p>{event.name}</p>
              <button className="p-4 py-2 md:py-4 md:px-6 text-sm md:text-base text-yellow-500 border border-yellow-500 rounded-full">
                Request to join
              </button>
            </div>
            <div className="flex flex-col gap-4 py-4">
              <p className="flex text-base gap-2 items-center">
                <MdDateRange size={18} />
                {new Date(event.fromDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })} • {event.time}
              </p>
              <p className="flex text-base gap-2 items-center">
                <MdLocationOn size={18} />
                {event.location}
              </p>
              <p className="flex text-sm md:max-w-1/2 gap-2 leading-4 text-gray-500 items-center">
                {event.description}
              </p>
              <div className="flex justify-between gap-4 flex-wrap">
                <p className="flex text-base gap-2 items-center">
                  <FiTarget size={18} />
                  Total Slots {event.totalSlots} |
                  <span className="text-green-600">2 slots available</span>
                </p>
                <p className="flex text-base gap-2 items-center">
                  <FaMoneyBill1Wave size={18} />
                  Rs {event.cost} per person
                </p>
              </div>
              <div className="w-full md:w-1/2 border-t border-b flex justify-between py-2">
                <div className="flex gap-4 items-center">
                  <FaRegUserCircle size={28} />
                  <div>
                    <p>John Doe</p>
                    <p className="text-sm">active since 2025</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div
                    id="waee"
                    className="w-14 rounded-xl h-full flex justify-center text-white bg-green-500 bg-center bg-cover items-center"
                  >
                    69%
                  </div>
                  <div
                    id="waee"
                    className="w-14 text-xs  flex-col  rounded-xl h-full flex justify-center text-white bg-green-700 bg-center bg-cover items-center"
                  >
                    <p>Rating</p>
                    <p className="flex items-center">
                      <FaStar color="gold" className="bg-gol" /> {event.rating}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
        
      </LayoutInnerMain>
    </Layout>
  );
};

export default EventDetail;

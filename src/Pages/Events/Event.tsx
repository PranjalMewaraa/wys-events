import React, { useState, useEffect } from "react";

import {
  FaSearch,
  FaMapMarkerAlt,
  FaBell,
  FaArrowLeft,
  FaEllipsisV,
  FaTimes,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import LayoutInnerMain from "../../Layout/LayoutInner";
import { FaLocationPin, FaRegCalendar } from "react-icons/fa6";
import { FiTarget } from "react-icons/fi";

const Home = () => {
  const [hideHeader, setHideHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHideHeader(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tags_for_chips = [
    "top hiking trails",
    "best camping spots",
    "top hiking trails",
    "best camping spots",
    "top hiking trails",
    "best camping spots",
    "top hiking trails",
    "best camping spots",
    "top hiking trails",
    "best camping spots",
  ];

  return (
    <Layout>
      <LayoutInnerMain>
        <div className="pb-28">
          <motion.h2
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: hideHeader ? 0 : 1, y: hideHeader ? -20 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-3xl p-4 poppins-medium mt-4 transition-all"
          >
            Events curated for you ...
          </motion.h2>

          <Link
            to="/search"
            className=" bg-gray-100 p-4  rounded m-4 flex items-center"
          >
            <FaSearch className="mr-2" /> Search events, trips & more
          </Link>

          <div className="w-full py-2 px-4 flex gap-2 md:gap-4 max-w-[100vw] overflow-x-auto">
            {tags_for_chips.map((item) => {
              return (
                <div className="p-2 px-3 text-xs drop-shadow bg-gray-50 rounded-xl w-fit text-nowrap">
                  {item}
                </div>
              );
            })}
          </div>

          <div className="space-y-4 w-full px-4 mt-4">
            <EventCard />
          </div>
        </div>
      </LayoutInnerMain>
    </Layout>
  );
};

const EventDetails = () => {
  const [requestSent, setRequestSent] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <FaArrowLeft
          className="text-2xl cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <FaEllipsisV
          className="text-2xl cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        />
      </div>

      {showDropdown && (
        <div className="absolute right-4 top-16 bg-white shadow-md rounded p-2 w-40">
          <button className="block w-full text-left p-2 hover:bg-gray-200">
            Save Event
          </button>
          <button className="block w-full text-left p-2 hover:bg-gray-200">
            Not for me
          </button>
          <button className="block w-full text-left p-2 hover:bg-gray-200 flex items-center">
            <FaTimes className="mr-2" /> Close
          </button>
        </div>
      )}

      <h1 className="text-xl font-bold">Himalayas Trek</h1>
      <img src="/himalayas.jpg" alt="Himalayas" className="w-full rounded" />
      <p>26 Jun 2025 - 8:00 AM | Prayagraj, Uttarakhand</p>
      <p>Total Slots: 7 | Slots Available: 2</p>
      <p>Rs. 3000 per person</p>
      <button
        onClick={() => setRequestSent(true)}
        className={`w-full p-2 rounded text-white ${
          requestSent ? "bg-orange-500" : "bg-blue-500"
        }`}
      >
        {requestSent ? "Request Sent" : "Request to Join"}
      </button>
    </div>
  );
};

const EventCard = () => {
  return (
    <Link
      to="/event/himalayas"
      className="block bg-white drop-shadow-xl rounded-xl shadow"
    >
      <img
        src="https://imgs.search.brave.com/Ah4hMz04IJ9Ncii-qAm0qbYmbCSl4MkNgTVHNBI9yF8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9hL2E5L0hp/a2luZ190b190aGVf/SWNlX0xha2VzLl9T/YW5fSnVhbl9OYXRp/b25hbF9Gb3Jlc3Ql/MkNfQ29sb3JhZG8u/anBnLzk2MHB4LUhp/a2luZ190b190aGVf/SWNlX0xha2VzLl9T/YW5fSnVhbl9OYXRp/b25hbF9Gb3Jlc3Ql/MkNfQ29sb3JhZG8u/anBn"
        alt="Himalayas"
        className="w-full rounded"
      />
      <h2 className="text-lg font-bold mt-2  p-4">Himalayas Trek</h2>
      <p className="px-4 flex gap-2 text-sm md:text-base items-center">
        {" "}
        <span>
          <FaRegCalendar />
        </span>
        26 Jun 2025 | 8:05 AM
      </p>

      <p className="px-4 flex text-sm md:text-base mt-2 gap-2 items-center">
        {" "}
        <span>
          <FaLocationPin />
        </span>
        Prayagraj, Uttarpradesh
      </p>

      <div className="flex p-4 justify-between">
        <p className="text-green-600 flex text-xs gap-2 items-center">
          <span>
            <FiTarget />
          </span>{" "}
          2 slots available
        </p>
        <p>Rs. 3000 per person</p>
      </div>
    </Link>
  );
};
export { EventDetails, Home };

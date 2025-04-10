import React, { useState, useEffect } from "react";
import { FaSearch, FaArrowLeft, FaEllipsisV, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import LayoutInnerMain from "../../Layout/LayoutInner";
import { FaLocationArrow, FaLocationPin, FaRegCalendar } from "react-icons/fa6";
import { FiTarget } from "react-icons/fi";
import { useEvents } from "../../utils/hooks/event";

// 🔍 Expandable Search Bar Component
const ExpandableSearchBar = ({
  onFilter,
  onReset,
  query,
  location,
  fromDate,
  toDate,
  setQuery,
  setLocation,
  setFromDate,
  setToDate,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleSearch = () => {
    onFilter({ query, location, fromDate, toDate });
  };

  const handleClose = (e) => {
    e.stopPropagation(); // prevent input focus triggering expansion again
    setExpanded(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-4">
      <div
        onClick={() => setExpanded(true)}
        className={`relative transition-all duration-500 bg-white shadow-xl border rounded-xl  cursor-pointer ${
          expanded ? "h-auto p-4" : "h-14 overflow-hidden"
        }`}
      >
        {/* ❌ Close Button */}

        {/* Search Input (always visible) */}
        <input
          type="text"
          placeholder="Search for events..."
          className="w-full px-4 py-2 h-full border rounded-lg outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setExpanded(true)}
        />

        {/* Expanded section */}
        {expanded && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                alert("Nearby search logic not implemented");
              }}
              className="mt-4 w-full flex gap-2 items-center justify-center border border-black text-black py-2 rounded-lg font-medium"
            >
              <FaLocationArrow size={16} /> Find Nearby Events
            </button>

            <div className="mt-4 flex justify-between gap-2">
              <label htmlFor="from" className="flex flex-col w-fit">
                From
                <input
                  id="from"
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={fromDate}
                  placeholder="from"
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </label>
              <label htmlFor="to" className="flex flex-col w-fit">
                To
                <input
                  id="to"
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={toDate}
                  placeholder="To"
                  onChange={(e) => setToDate(e.target.value)}
                />
              </label>
            </div>

            <input
              type="text"
              placeholder="Anywhere specific ?"
              className="mt-4 w-full px-4 py-2 border rounded-lg"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSearch();
              }}
              className="mt-4 w-full bg-black text-white py-2 rounded-lg font-semibold"
            >
              🔍 Search
            </button>

            <div className="flex w-full my-2 justify-between items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onReset();
                  setExpanded(false); // collapse on reset
                }}
                className="mt-2 text-sm text-blue-600 underline"
              >
                🔄 Reset Filters
              </button>

              {expanded && (
                <button
                  onClick={handleClose}
                  className=" p-3 bg-black text-gray-50 rounded hover:text-red-500"
                >
                  Close
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Home = () => {
  const [hideHeader, setHideHeader] = useState(false);
  const { events } = useEvents();
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Shared state for search
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    setFilteredEvents(events); // Show all initially
  }, [events]);

  useEffect(() => {
    const handleScroll = () => {
      setHideHeader(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFilter = ({ query, location, fromDate, toDate }) => {
    setQuery(query);
    setLocation(location);
    setFromDate(fromDate);
    setToDate(toDate);

    const filtered = events.filter((event) => {
      const searchLower = query.toLowerCase();
      const locationLower = location.toLowerCase();

      const matchesQuery =
        !query ||
        event.name.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.category.toLowerCase().includes(searchLower);

      const matchesLocation =
        !location || event.location.toLowerCase().includes(locationLower);

      const eventFromDate = new Date(event.fromDate);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      const matchesDate =
        (!from || eventFromDate >= from) && (!to || eventFromDate <= to);

      return matchesQuery && matchesLocation && matchesDate;
    });

    setFilteredEvents(filtered);
  };

  const resetFilters = () => {
    setQuery("");
    setLocation("");
    setFromDate("");
    setToDate("");
    setFilteredEvents(events);
  };

  const tags_for_chips = [
    "top hiking trails",
    "best camping spots",
    "photography",
    "open mic",
    "art shows",
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

          <div className="w-full py-2 px-4 flex gap-2 md:gap-4 max-w-[100vw] overflow-x-auto">
            {tags_for_chips.map((item, id) => (
              <div
                key={id}
                className="p-2 px-3 text-xs drop-shadow bg-gray-50 rounded-xl w-fit text-nowrap"
              >
                {item}
              </div>
            ))}
          </div>

          {/* 🔍 Search Bar with Reset */}
          <ExpandableSearchBar
            onFilter={handleFilter}
            onReset={resetFilters}
            query={query}
            location={location}
            fromDate={fromDate}
            toDate={toDate}
            setQuery={setQuery}
            setLocation={setLocation}
            setFromDate={setFromDate}
            setToDate={setToDate}
          />

          {/* 🎫 Event Cards */}
          <div className="space-y-4 w-full flex gap-4 flex-wrap px-4 mt-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))
            ) : (
              <p className="text-center text-gray-500 w-full">
                No events found.
              </p>
            )}
          </div>
        </div>
      </LayoutInnerMain>
    </Layout>
  );
};

const EventCard = ({ event }) => {
  const convertToAmPm = (time24) => {
    if (!time24) return "";
    const [hourStr, minute] = time24.split(":");
    const hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  return (
    <Link
      to={`/event/${event._id}`}
      className="block bg-white w-full md:max-w-sm drop-shadow-xl rounded-xl shadow"
    >
      <img
        src={event.image || "/event/hikinh.webp"}
        alt={event.name || "Event Image"}
        className="w-full h-48 object-cover rounded-t-xl"
      />

      <h2 className="text-lg font-bold mt-2 p-4">{event.name}</h2>
      <p className="px-4 flex gap-2 text-sm md:text-base items-center">
        <span>
          <FaRegCalendar />
        </span>
        {new Date(event.fromDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        | {event.time}
      </p>

      <p className="px-4 flex text-sm md:text-base mt-2 gap-2 items-center">
        <span>
          <FaLocationPin />
        </span>
        {event.location}
      </p>

      <div className="flex p-4 justify-between">
        <p className="text-green-600 flex text-xs gap-2 items-center">
          <span>
            <FiTarget />
          </span>{" "}
          {event.availableSlots || 0} slots available
        </p>
        <p>Rs. {event.cost} per person</p>
      </div>
    </Link>
  );
};

export default Home;

const EventDetails = () => {
  const { events } = useEvents();

  const [requestSent, setRequestSent] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  // const convertToAmPm = (time24) => {
  //   if (!time24) return "";
  //   const [hourStr, minute] = time24.split(":");
  //   const hour = parseInt(hourStr, 10);
  //   const ampm = hour >= 12 ? "PM" : "AM";
  //   const hour12 = hour % 12 || 12;
  //   return `${hour12}:${minute} ${ampm}`;
  // };
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
      {events.map((event, _id) => (
        <div key={_id}>
          <h1 className="text-xl font-bold">{event.name}</h1>
          <img
            src="/himalayas.jpg"
            alt="Himalayas"
            className="w-full rounded"
          />
          <p>
            {new Date(event.fromDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            - {event.time} | {event.location}
          </p>
          <p>Total Slots: {event.totalSlots} | Slots Available: 2</p>
          <p>Rs. {event.cost} per person</p>
          <button
            onClick={() => setRequestSent(true)}
            className={`w-full p-2 rounded text-white ${
              requestSent ? "bg-orange-500" : "bg-blue-500"
            }`}
          >
            {requestSent ? "Request Sent" : "Request to Join"}
          </button>
        </div>
      ))}
    </div>
  );
};

export { EventDetails, Home };

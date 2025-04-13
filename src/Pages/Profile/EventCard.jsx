import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { FaRegCalendar } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import { FiTarget } from "react-icons/fi";

const EventCard = ({ eventId }) => {
  const [event, setEvent] = useState(null);
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `https://wysbackend.onrender.com/api/events/${eventId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  if (!event) {
    return (
      <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-4 animate-pulse h-48 flex items-center justify-center">
        <p className="text-gray-400">Loading event...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-4">
      <img
        src={event.image}
        alt={event.title}
        className="w-full rounded h-48 object-cover"
      />
      <h2 className="text-lg font-bold mt-2 px-4">{event.name}</h2>

      <p className="px-4 flex gap-2 text-sm md:text-base items-center">
        <FaRegCalendar />
        {format(new Date(event.fromDate), "dd MMM yyyy")} | {event.time}
      </p>

      <p className="px-4 flex text-sm md:text-base mt-2 gap-2 items-center">
        <FaLocationPin />
        {event.location}
      </p>

      <div className="flex p-4 justify-between">
        <p className="text-green-600 flex text-xs gap-2 items-center">
          <FiTarget />
          {event.totalSlots} slots available
        </p>
        <p className="text-sm font-semibold">Rs. {event.cost} per person</p>
      </div>
    </div>
  );
};

export default EventCard;

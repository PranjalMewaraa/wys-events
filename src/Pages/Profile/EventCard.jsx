import React from "react";

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-4">
      <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />

      <div className="p-4">
        <h3 className="text-xl font-semibold">{event.title}</h3>
        
        <div className="flex items-center text-gray-600 text-sm mt-2">
          📅 {event.date} - {event.time}
        </div>
        
        <div className="flex items-center text-gray-600 text-sm mt-1">
          📍 {event.location}
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-green-600 text-sm font-medium">{event.slots} slots available</span>
          <span className="text-gray-800 font-semibold">💰 Rs. {event.price} per person</span>
        </div>

        <div className="mt-3 flex items-center">
          <span
            className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
              event.status === "Hosted" ? "bg-orange-500" : "bg-gray-700"
            }`}
          >
            {event.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

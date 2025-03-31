import React from "react";
import EventCard from "./EventCard";

const ExperienceList = () => {
  const events = [
    {
      id: 1,
      image: "https://source.unsplash.com/400x300/?mountains,trek",
      title: "Himalayas Trek",
      date: "26 Jun 2025",
      time: "8:00 AM",
      location: "Prayagraj, Uttarakhand",
      slots: "2",
      price: 3000,
      status: "Hosted",
    },
    {
      id: 2,
      image: "https://source.unsplash.com/400x300/?neon,comedy",
      title: "Comedy Show",
      date: "1 Aug 2025",
      time: "9:00 PM",
      location: "Vasant Kunj, New Delhi",
      slots: "5",
      price: 1500,
      status: "Attending",
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Live</h2>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default ExperienceList;

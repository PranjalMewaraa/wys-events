import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const CardBox = ({ emoji, question, answer }) => (
  <div className="bg-orange-400 p-4 rounded-xl text-white shadow-md">
    <p className="font-semibold text-lg">{emoji} {question}</p>
    <p className="text-base mt-2">"{answer}"</p>
  </div>
);

const UserProfileCard = ({ user }) => {
  return (
    <Card className="p-4 rounded-2xl shadow-lg w-full">
      <div className="flex items-center gap-4">
        <img
          src={user.image}
          alt={user.name}
          className="w-20 h-20 rounded-xl object-cover"
        />
        <div className="flex-1">
          <h2 className="text-lg font-bold">{user.name}</h2>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <MapPin size={16} className="text-red-500" /> {user.location}
          </p>
          <p className="text-sm font-medium text-gray-700">{user.gender}</p>
          <div className="flex gap-2 mt-1 flex-wrap">
            {user.tags.map((tag, index) => (
              <span key={index} className="text-xs px-2 py-1 bg-gray-200 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-green-500 font-bold text-lg">{user.matchPercentage}%</div>
      </div>
      <p className="mt-2 text-sm font-medium text-orange-600">{user.trip}</p>
    </Card>
  );
};

const UserProfilePage = ({ user }) => {
  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-bold text-center">@{user.username}</h2>
      <div className="mt-4 space-y-4">
        <CardBox emoji="🎒" question="What's one thing you always pack?" answer={user.packedItem} />
        <CardBox emoji="🎵" question="What's your travel soundtrack?" answer={user.soundtrack} />
        <CardBox emoji="🚀" question="Your ideal way to spend a free evening in a new city?" answer={user.eveningActivity} />
        <CardBox emoji="🎬" question="One movie that makes you want to travel?" answer={user.travelMovie} />
        <div>
          <h3 className="text-lg font-semibold">My ideal trips</h3>
          <div className="flex gap-2 flex-wrap mt-2">
            {user.travelStyles.map((style, index) => (
              <span key={index} className="px-3 py-1 bg-orange-400 text-white rounded-full">
                {style}
              </span>
            ))}
          </div>
        </div>
      </div>
      <h3 className="text-lg font-semibold mt-4">Events Hosted</h3>
      {user.events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
};

const EventCard = ({ event }) => (
  <div className="bg-white shadow-lg rounded-xl p-4 mt-4">
    <img src={event.image} className="h-40 w-full rounded-lg" alt={event.title} />
    <h4 className="font-bold text-lg mt-2">{event.title}</h4>
    <p className="text-gray-600">📅 {event.date}</p>
    <p className="text-gray-600">📍 {event.location}</p>
    <p className="text-gray-600">👥 {event.seekers} Seekers</p>
    <p className="text-green-600 font-bold mt-1">⭐ {event.rating}</p>
  </div>
);

const App = () => {
  const user = {
    username: "AditiWanders",
    name: "Aditi Wanderlust",
    location: "Mumbai, India",
    gender: "Female",
    image: "https://via.placeholder.com/100",
    matchPercentage: 85,
    trip: "Hosting a trip to Goa",
    tags: ["Balanced explorer", "Opposites attract"],
    travelStyles: ["Tropical beach escape", "Food-hopping", "Road trips"],
    packedItem: "A journal & my camera!",
    soundtrack: "Coldplay & Lo-fi beats on the road!",
    eveningActivity: "Rooftop sunset + local food + 🎶 Live music at a cozy bar",
    travelMovie: "A journal & my camera!",
    events: [
      {
        title: "Himalayas Trek",
        date: "26 Jan 2025 - 8:00 AM",
        location: "Prayagraj, Uttarakhand",
        seekers: 6,
        rating: 4.2,
        image: "mountain",
      },
    ],
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen p-4 overflow-y-auto">
      <UserProfileCard user={user} />
      <UserProfilePage user={user} />
      <Button className="mt-6 w-full bg-black text-white py-2 rounded-lg">👋 Say Hello</Button>
    </div>
  );
};

export default App;

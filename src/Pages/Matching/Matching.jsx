import React from "react";
import { FaInstagram, FaLinkedin, FaStar } from "react-icons/fa";
import { GrLocationPin } from "react-icons/gr";
import Layout from "../../Layout/Layout";
import { useParams } from "react-router-dom";
import { useCompatibility, useUserById } from "../../utils/hooks/user";

const Matching = () => {
  const { userId } = useParams();
  const { user, loading, error } = useUserById(userId);
  const { compatibility } = useCompatibility(userId);
  const matchPercentage = compatibility?.compatibilityScore ?? "…";

  return (
    <div>
      {loading && <div className="p-4">Loading...</div>}
      {error && <div className="p-4 text-red-500">Something went wrong</div>}
      {user && (
        <div className="w-full pb-20 h-full bg-white mx-auto p-4 overflow-y-scroll">
          {/* Header */}
          <div className="flex items-center justify-between">
            <button>&larr;</button>
            <span className="font-semibold">@{user.username || user.name}</span>
            <button>⋮</button>
          </div>

          <div className="flex mt-4 max-w-sm w-full max-h-64 gap-4 items-center">
            <div className="w-1/2 h-full aspect-square object-fill overflow-hidden rounded-xl">
              <img
                src={user.avatar || "https://via.placeholder.com/150"}
                className="h-full origin-top object-top object-cover w-full"
                alt={user.name}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold">{user.name}</h2>
              <div className="flex flex-wrap items-center text-sm">
                <p className="text-gray-500">{user.gender}</p>
                <p className="flex items-center text-gray-500">
                  <GrLocationPin /> {user.currentLocation}
                </p>
              </div>
              <div className="flex gap-2 py-2">
                <FaInstagram />
                <FaLinkedin />
              </div>
              <div className="flex gap-2">
                <div className="flex justify-center items-center bg-green-500 p-2 text-white poppins-semibold rounded-lg">
                  {loading ? "..." : `${matchPercentage}%`}
                </div>
                <div className="flex flex-col gap-1 text-xs justify-center items-center bg-[#2D6F2C] p-2 text-white poppins-semibold rounded-lg">
                  <p>Host Rating</p>
                  <p className="flex items-center text-yellow-300 gap-2 text-sm">
                    <FaStar /> 4.3
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {user.profileImages.map((image, i) => (
              <div key={i} className="w-full h-24 bg-gray-200 rounded-lg">
                <img src={image} />
              </div>
            ))}
          </div>

          {/* Travel Style */}
          <div className="mt-4">
            <h2 className="font-semibold">My travel style</h2>
            <div className="flex flex-wrap gap-2 p-2 border rounded-lg">
              {user.travelPreferences?.map((preference, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-300 text-white rounded-full text-sm"
                >
                  {preference}
                </span>
              ))}
            </div>
          </div>

          {/* Questions & Answers */}
          <div className="mt-4 space-y-4">
            {[
              {
                icon: "🎒",
                question: "What's one thing you always pack?",
                answer: user.profileDetails?.alwaysPack || "N/A",
              },
              {
                icon: "🎶",
                question: "What's your travel soundtrack?",
                answer: user.profileDetails?.travelSoundtrack || "N/A",
              },
              {
                icon: "🎬",
                question: "One movie that makes you want to travel?",
                answer: user.profileDetails?.favoriteTravelMovie || "N/A",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-orange-400 text-white p-4 rounded-lg"
              >
                <p className="font-semibold italic">
                  {item.icon} {item.question}
                </p>
                <p className="mt-1">{item.answer}</p>
              </div>
            ))}
          </div>

          {/* Ideal Trips */}
          <div className="mt-4">
            <h2 className="font-semibold">My ideal trips</h2>
            <div className="flex flex-wrap gap-2 p-2 border rounded-lg">
              {user.idealTrip?.map((style, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-300 text-white rounded-full text-sm"
                >
                  {style}
                </span>
              ))}
            </div>
          </div>

          {/* Events Hosted Section */}
          <h2 className="mt-6 font-semibold text-lg">Events hosted</h2>
          {user.eventsHosted?.length === 0 ? (
            <p className="text-gray-500 text-sm mt-2">No events hosted yet.</p>
          ) : (
            user.eventsHosted.map((event, index) => (
              <div
                key={index}
                className="mt-2 bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={event.image || "/images/screenshot.png"}
                  alt={event.title || "Event"}
                  className="w-full h-[160px] object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold text-lg">{event.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    📅{" "}
                    {new Date(event.fromDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    📍 {event.location}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    👥 {event.participants?.length || 0} Seekers
                  </p>
                  <div className="mt-2">
                    <span className="bg-green-500 text-white px-2 py-1 text-xs rounded-md">
                      Rating {event.rating || "4.2"} ★
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Events Attended Section */}
          <h2 className="mt-6 font-semibold text-lg">Events attended</h2>
          {user.eventsAttended?.length === 0 ? (
            <p className="text-gray-500 text-sm mt-2">
              No events attended yet.
            </p>
          ) : (
            user.eventsAttended.map((event, index) => (
              <div
                key={index}
                className="mt-2 bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={event.image || "/images/screenshot.png"}
                  alt={event.title || "Event"}
                  className="w-full h-[160px] object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold text-lg">{event.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    📅{" "}
                    {new Date(event.fromDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    📍 {event.location}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    👥 {event.participants?.length || 0} Seekers
                  </p>
                  <div className="mt-2">
                    <span className="bg-green-500 text-white px-2 py-1 text-xs rounded-md">
                      Rating {event.rating || "4.2"} ★
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Say Hello Button */}
          <button className="fixed bottom-4 left-4 right-4 bg-gray-900 text-white text-lg py-3 rounded-lg flex items-center justify-center font-medium z-50">
            👋 Say Hello
          </button>
        </div>
      )}
    </div>
  );
};

export default Matching;

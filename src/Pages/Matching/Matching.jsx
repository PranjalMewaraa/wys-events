import React from "react";
import { FaInstagram, FaLinkedin, FaStar } from "react-icons/fa";
import { GrLocationPin } from "react-icons/gr";
import Layout from "../../Layout/Layout";
import { useParams } from "react-router-dom";
import { useCompatibility, useUserById } from "../../utils/hooks/user";
import { sendFriendRequest } from "../../utils/api";

const Matching = () => {
  const { userId } = useParams();
  const { user, loading, error } = useUserById(userId);
  const { compatibility } = useCompatibility(userId);
  const matchPercentage = compatibility?.compatibilityScore ?? "…";
  const handleSendMessageReq = async () => {
    try {
      const message = "Hey Happy to connect with you! ";
      const res = await sendFriendRequest(userId, message);
      alert("Friend request sent!");
      console.log("Request response:", res);
    } catch (err) {
      console.error("Failed to send friend request:", err);
      alert("Something went wrong!");
    }
  };
  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white px-4 pb-28 pt-4 min-h-screen">
        {loading && <p className="text-center text-sm">Loading...</p>}
        {error && (
          <p className="text-center text-red-500 text-sm">
            Something went wrong
          </p>
        )}
        {user && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <button className="text-xl">&larr;</button>
              <span className="font-semibold text-base">
                @{user.username || user.name}
              </span>
              <button className="text-xl">⋮</button>
            </div>

            {/* Profile Section */}
            <div className="flex gap-4">
              <div className="w-1/2 aspect-square overflow-hidden rounded-xl">
                <img
                  src={user.avatar || "https://via.placeholder.com/150"}
                  className="object-cover w-full h-full"
                  alt={user.name}
                />
              </div>
              <div className="flex flex-col justify-between">
                <h2 className="text-lg font-bold">{user.name}</h2>
                <div className="text-sm text-gray-500">
                  <p>{user.gender}</p>
                  <p className="flex items-center gap-1">
                    <GrLocationPin /> {user.currentLocation}
                  </p>
                </div>
                <div className="flex gap-3 mt-2 text-xl text-gray-600">
                  <FaInstagram />
                  <FaLinkedin />
                </div>
                <div className="flex gap-2 mt-3">
                  <div
                    className="text-right text-sm font-semibold text-white rounded-xl py-4 px-2"
                    style={{
                      backgroundImage: "url('/wae.png')",
                      backgroundSize: "cover",
                      backgroundOrigin: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {matchPercentage}%
                  </div>
                  <div className="bg-[#2D6F2C] text-white px-3 py-1 rounded-lg text-sm flex flex-col items-center font-semibold">
                    <span>Host Rating</span>
                    <span className="flex items-center text-yellow-300 text-base gap-1">
                      <FaStar /> 4.3
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Images Grid */}
            {user.profileImages?.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-6">
                {user.profileImages.map((image, i) => (
                  <div
                    key={i}
                    className="w-full h-24 bg-gray-200 rounded-lg overflow-hidden"
                  >
                    <img
                      src={image}
                      alt={`Profile ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Travel Preferences */}
            {user.travelPreferences?.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-1">My travel style</h3>
                <div className="flex flex-wrap gap-2 p-2 border rounded-lg">
                  {user.travelPreferences.map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm bg-orange-300 text-white rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Q&A Section */}
            <div className="mt-6 space-y-4">
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
              ].map((qna, i) => (
                <div
                  key={i}
                  className="bg-orange-400 text-white p-4 rounded-lg"
                >
                  <p className="font-semibold italic">
                    {qna.icon} {qna.question}
                  </p>
                  <p className="mt-1 text-sm">{qna.answer}</p>
                </div>
              ))}
            </div>

            {/* Ideal Trips */}
            {user.idealTrip?.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-1">My ideal trips</h3>
                <div className="flex flex-wrap gap-2 p-2 border rounded-lg">
                  {user.idealTrip.map((trip, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm bg-orange-300 text-white rounded-full"
                    >
                      {trip}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Events Hosted */}
            <div className="mt-8">
              <h2 className="font-semibold text-lg">Events Hosted</h2>
              {user.eventsHosted?.length === 0 ? (
                <p className="text-gray-500 text-sm mt-2">
                  No events hosted yet.
                </p>
              ) : (
                user.eventsHosted.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))
              )}
            </div>

            {/* Events Attended */}
            <div className="mt-8">
              <h2 className="font-semibold text-lg">Events Attended</h2>
              {user.eventsAttended?.length === 0 ? (
                <p className="text-gray-500 text-sm mt-2">
                  No events attended yet.
                </p>
              ) : (
                user.eventsAttended.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))
              )}
            </div>

            {/* Say Hello Button */}
          <button className="fixed bottom-4 left-4 right-4 bg-gray-900 text-white text-lg py-3 rounded-lg flex items-center justify-center font-medium z-50" onClick={handleSendMessageReq}>
            👋 Say Hello
          </button>
          </>
        )}
      </div>
    </Layout>
  );
};

const EventCard = ({ event }) => {
  return (
    <div className="mt-4 bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={event.image || "/event/hikinh.webp"}
        alt={event.name}
        className="w-full h-[160px] object-cover"
      />
      <div className="p-3">
        <h3 className="font-semibold text-base">{event.name}</h3>
        <p className="text-sm text-gray-600 mt-1">
          📅{" "}
          {new Date(event.fromDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-sm text-gray-600 mt-1">📍 {event.location}</p>
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
  );
};

export default Matching;

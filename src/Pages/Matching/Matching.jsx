import React, { useState } from "react";
import { FaInstagram, FaLinkedin, FaStar } from "react-icons/fa";
import { GrLocationPin } from "react-icons/gr";
import Layout from "../../Layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCompatibility, useUserById } from "../../utils/hooks/user";
import { sendFriendRequest } from "../../utils/api";
import { FaFlag } from "react-icons/fa6";
import { apiGet, apiPost } from "../../utils/call";

const Matching = () => {
  const { userId } = useParams();
  const { user, loading, error } = useUserById(userId);
  const { compatibility } = useCompatibility(userId);
  const matchPercentage = compatibility?.compatibilityScore ?? "…";
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [flagStep, setFlagStep] = useState(1); // 1: confirm, 2: reason input
  const [flagReason, setFlagReason] = useState("");

  const handleSendMessageReq = async () => {
    try {
      const message = "Hey Happy to connect with you! ";
      const res = await sendFriendRequest(userId, message);
      alert("Friend request sent!");
      console.log("Request response:", res);
    } catch (err) {
      console.error("Failed to send friend request:", err);

      alert(err.message);
    }
  };
  const navigate = useNavigate();

  const handleFlag = async () => {
    console.log("Flagged userId:", userId);
    console.log("Reason:", flagReason);
    setShowFlagModal(false);
    setFlagStep(1);
    setFlagReason("");
    const res = await apiPost(`/users/flag/${userId}`, {
      reason: flagReason,
    });
    console.log("Flag response:", res);
    alert(res.message);
  };
  return (
    <Layout>
      <div className="w-full max-w-xl mx-auto bg-white px-4 pb-28 pt-4 min-h-screen">
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
              <button onClick={() => navigate(-1)} className="text-xl">
                &larr;
              </button>
              <span className="font-semibold text-base">
                @{user.username || user.name}
              </span>
              <div className="relative">
                <button
                  className="text-xl"
                  onClick={() => setShowDropdown((prev) => !prev)}
                >
                  ⋮
                </button>

                {showDropdown && (
                  <div className="absolute min-w-36 w-fit right-0 mt-2 bg-slate-900 text-white shadow-md rounded-md z-10">
                    <button
                      onClick={() => {
                        setShowFlagModal(true);
                        setShowDropdown(false);
                      }}
                      className="flex gap-4 items-center w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      <FaFlag color="orange" size={16} /> Flag User
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Section */}
            <div className="flex gap-6 p-4 bg-white rounded-xl shadow-md max-w-3xl">
              {/* Avatar */}
              <div className="w-56 h-48 rounded-xl overflow-hidden">
                <img
                  src={user.avatar || "https://via.placeholder.com/150"}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info Section */}
              <div className="flex flex-col justify-between flex-1">
                {/* Name */}
                <h2 className="text-2xl font-bold text-gray-800">
                  {user.name}
                </h2>

                {/* Gender & Location */}
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{user.gender}</p>
                  <p className="flex items-center gap-1">
                    <GrLocationPin className="text-lg" />
                    {user.currentLocation}
                  </p>
                </div>

                {/* Social Icons */}
                <div className="flex gap-3 py-2 text-xl">
                  {user?.socialLinks?.instagram && (
                    <a
                      href={`https://www.instagram.com/${user?.socialLinks?.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-pink-500"
                      title="Instagram"
                    >
                      <FaInstagram />
                    </a>
                  )}
                  {user?.socialLinks?.linkedin && (
                    <a
                      href={`https://www.linkedin.com/in/${user?.socialLinks?.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600"
                      title="LinkedIn"
                    >
                      <FaLinkedin />
                    </a>
                  )}
                </div>

                {/* Match & Rating */}
                <div className="flex gap-3 mt-4">
                  {/* Match Percentage */}
                  <div
                    className="text-white text-sm font-semibold rounded-xl px-4 py-2 flex items-center justify-center"
                    style={{
                      backgroundImage: "url('/wae.png')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {matchPercentage}%
                  </div>

                  {/* Host Rating */}
                  <div className="bg-green-700 text-white px-4 py-2 rounded-xl text-sm flex flex-col items-center font-semibold">
                    <span>Host Rating</span>
                    <span className="flex items-center text-yellow-300 gap-1 text-base">
                      <FaStar />
                      4.3
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
            <button
              className="fixed bottom-24 md:bottom-8 left-1/2 transform -translate-x-1/2 px-8 bg-gray-900 text-white text-lg py-3 rounded-lg flex w-fit items-center justify-center font-medium z-50"
              onClick={handleSendMessageReq}
            >
              👋 Say Hello
            </button>
            {/* Flag Modal */}
            {showFlagModal && (
              <div className="fixed inset-0 z-50 backdrop-blur-md bg-white/30 flex items-center justify-center px-4">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  {/* Step 1: Confirmation */}
                  {flagStep === 1 && (
                    <>
                      <h3 className="text-lg font-semibold mb-4">
                        Do you want to flag this user?
                      </h3>

                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => setFlagStep(2)}
                          className="px-8 py-2 bg-amber-600 text-white text-sm rounded"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setShowFlagModal(false)}
                          className="px-8 py-2 bg-gray-300 text-sm rounded"
                        >
                          No
                        </button>
                      </div>
                    </>
                  )}

                  {/* Step 2: Input Reason */}
                  {flagStep === 2 && (
                    <>
                      <h3 className="text-lg font-semibold mb-2">
                        Reason for flagging
                      </h3>
                      <textarea
                        className="w-full border p-2 rounded mb-4"
                        rows={4}
                        value={flagReason}
                        onChange={(e) => setFlagReason(e.target.value)}
                        placeholder="Enter reason here..."
                      />
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={handleFlag}
                          className="px-8 py-4 bg-amber-600 text-white  rounded-full"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setShowFlagModal(f7alse);
                            setFlagStep(1);
                            setFlagReason("");
                          }}
                          className="px-8 py-4 bg-gray-300 text-slate-800  rounded-full"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
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

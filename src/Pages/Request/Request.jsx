import React, { useEffect, useState } from "react";
import { FaInstagram, FaLinkedin, FaStar } from "react-icons/fa";
import { GrLocationPin } from "react-icons/gr";
import Layout from "../../Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPatch } from "../../utils/call";

const Request = () => {
  const { id, event } = useParams();
  const [user, setUser] = useState(null);
  const nav = useNavigate();
  useEffect(() => {
    const getProfile = async () => {
      const res = await apiGet(`/users/${id}`);
      setUser(res.data);
    };
    getProfile();
  }, [id]);

  if (!user) return <Layout>Loading...</Layout>;

  const handleAccept = async () => {
    try {
      const res = await apiPatch(`/events/${event}/request/${id}/approve`);
      console.log(res);

      nav(`/listing/myevent/detail/${event}`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleReject = async () => {
    try {
      const res = await apiPatch(`/events/${event}/request/${id}/reject`);
      console.log(res);
      nav(`/listing/myevent/detail/${event}`);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    avatar,
    name,
    gender,
    currentLocation,
    socialLinks,
    profileImages,
    travelPreferences = [],
    idealTrip = [],
    profileDetails = {},
    eventsHosted = [],
    eventsAttended = [],
  } = user;

  const questions = [
    {
      icon: "🎒",
      question: "What's one thing you always pack?",
      answer: profileDetails.alwaysPack || "Not answered",
    },
    {
      icon: "🎶",
      question: "What's your travel soundtrack?",
      answer: profileDetails.travelSoundtrack || "Not answered",
    },
    {
      icon: "🌆",
      question: "What's your ideal evening during travel?",
      answer: profileDetails.idealEvening || "Not answered",
    },
    {
      icon: "🎬",
      question: "Favorite travel movie?",
      answer: profileDetails.favoriteTravelMovie || "Not answered",
    },
  ];

  const renderEvents = (events) => (
    <div className="flex gap-2 flex-wrap">
      {events.map((event, i) => (
        <div
          key={i}
          className="mt-2 bg-white min-w-xs shadow-lg rounded-lg overflow-hidden"
        >
          <img
            src={event.image || "/event/hikinh.webp"}
            alt={event.name}
            className="w-full h-[160px] object-cover"
          />
          <div className="p-3">
            <h3 className="font-semibold text-lg">{event.name}</h3>
            <p className="text-sm text-gray-600 flex items-center mt-1">
              📅 {new Date(event.fromDate).toLocaleDateString()} · {event.time}
            </p>
            <p className="text-sm text-gray-600 flex items-center mt-1">
              📍 {event.location}, {event.state}
            </p>
            <p className="text-sm text-gray-600 flex items-center mt-1">
              👥 {event.totalSlots || 0} Seekers
            </p>
            <div className="mt-2 flex items-center">
              <span className="bg-green-500 text-white px-2 py-1 text-xs rounded-md">
                Rating {event.rating || 4.0} ★
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Layout>
      <div className="w-full h-full bg-white mx-auto p-4 overflow-y-scroll">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button>&larr;</button>
          <span className="font-semibold">@{name?.split(" ")[0]}</span>
          <button>⋮</button>
        </div>

        {/* User Info */}
        <div className="flex mt-4 max-w-sm md:max-w-lg w-full max-h-64 gap-4 items-center">
          <div className="w-1/2 h-full aspect-square overflow-hidden rounded-xl">
            <img
              src={avatar}
              className="h-full object-cover w-full"
              alt="avatar"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">{name}</h2>
            <div className="flex flex-col text-sm text-gray-500">
              <p>{gender}</p>
              <p className="flex items-center gap-1">
                <GrLocationPin /> {currentLocation}
              </p>
            </div>
            <div className="flex gap-2 py-2 text-xl text-gray-600">
              {socialLinks?.instagram && (
                <FaInstagram onClick={window.open(socialLinks.instagram)} />
              )}
              {socialLinks?.linkedin && (
                <FaLinkedin onClick={window.open(socialLinks.linkedin)} />
              )}
            </div>
            <div className="flex gap-2">
              <div className="flex justify-center items-center bg-green-500 p-2 text-white rounded-lg text-xs">
                80%
              </div>
              <div className="flex flex-col gap-1 justify-center items-center bg-[#2D6F2C] p-2 text-white rounded-lg text-xs">
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
          {profileImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`profile-${i}`}
              className="w-full h-24 object-cover rounded-lg"
            />
          ))}
        </div>

        {/* Travel Style */}
        <div className="mt-4">
          <h2 className="font-semibold">My travel style</h2>
          <div className="flex flex-wrap gap-2 p-2 border rounded-lg">
            {travelPreferences.map((style) => (
              <span
                key={style}
                className="px-3 py-1 bg-orange-300 text-white rounded-full text-sm"
              >
                {style}
              </span>
            ))}
          </div>
        </div>

        {/* Q&A Section */}
        <div className="mt-4 space-y-4">
          {questions.map((item, index) => (
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
            {idealTrip.map((style) => (
              <span
                key={style}
                className="px-3 py-1 bg-orange-300 text-white rounded-full text-sm"
              >
                {style}
              </span>
            ))}
          </div>
        </div>

        {/* Events Hosted Section */}
        <h2 className="mt-6 font-semibold text-lg">Events Hosted</h2>
        {eventsHosted.length > 0 ? (
          renderEvents(eventsHosted)
        ) : (
          <p>No events hosted.</p>
        )}

        {/* Events Attended Section */}
        <h2 className="mt-6 font-semibold text-lg">Events Attended</h2>
        {eventsAttended.length > 0 ? (
          renderEvents(eventsAttended)
        ) : (
          <p>No events attended.</p>
        )}
        <div className="w-full justify-center flex">
          <div className="flex gap-2 max-w-lg w-full flex-col">
            <button
              className="mt-3  bg-amber-600 cursor-pointer text-white px-4 w-full text-lg py-3 rounded-lg"
              onClick={handleAccept}
            >
              ✅ Accept
            </button>
            <button
              className="mt-3  mb-20 bg-slate-900 cursor-pointer  px-4 w-full text-white text-lg py-3 rounded-lg"
              onClick={handleReject}
            >
              ❌ Reject
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Request;

import React, { useEffect, useState } from "react";
import { FaInstagram, FaLinkedin, FaStar } from "react-icons/fa";
import { GrLocationPin } from "react-icons/gr";

import AdminLayout from "../Layout/AdminLayouts/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet } from "../utils/call";
import { formatDate } from "../utils/formatDate";
import { FaFlag } from "react-icons/fa6";

const UserProfile = () => {
  const { id } = useParams();
  const [matches, setMatches] = useState([]);

  const [user, setUser] = useState({});
  const [myEvents, setMyEvents] = useState([]);
  const getProfile = async () => {
    const res = await apiGet(`/admin/user/${id}`);
    console.log(res.data);
    setUser(res.data);
  };

  const getMatches = async () => {
    const res = await apiGet(`/admin/matchmaking/${id}`);
    console.log(res.data);
    setMatches(res.data.matches);
  };

  useEffect(() => {
    getProfile();
    getMatches();
  }, []);
  const navigate = useNavigate();
  return (
    <AdminLayout>
      <div className="w-full h-full bg-white mx-auto p-4 overflow-y-scroll">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)}>&larr;</button>
          <span className="font-semibold">@{user?.name}</span>
          <button>⋮</button>
        </div>

        <div className="flex mt-4 max-w-sm w-full max-h-64 gap-4 items-center">
          <div className="w-1/2 h-full aspect-square object-fill overflow-hidden rounded-xl">
            <img
              src={user.avatar}
              className="h-full origin-top object-top object-cover w-full"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">{user?.name}</h2>
            <div className="flex flex-wrap items-center text-sm">
              <p className=" text-gray-500">{user?.gender || "N/A"}</p>
              <p className="flex items-center  text-gray-500">
                <GrLocationPin /> {user?.currentLocation}
              </p>
            </div>
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

            <div className="flex gap-2">
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
        <div className="grid grid-cols-3 md:grid-cols-8 gap-2 mt-4">
          {user?.profileImages?.map((item, i) => (
            <img
              key={i}
              src={item}
              className="w-full h-24 md:h-36 max-w-36 bg-gray-200 rounded-lg"
            ></img>
          ))}
        </div>
        {/* Travel Style */}
        <div className="mt-4">
          <h2 className=" font-semibold">My travel style</h2>
          <div className="flex flex-wrap gap-2 p-2 border rounded-lg">
            {user?.travelPreferences?.map((style) => (
              <span
                key={style}
                className="px-3 py-1 bg-orange-300 text-white rounded-full text-sm"
              >
                {style}
              </span>
            ))}
          </div>
        </div>
        {/* Questions & Answers */}
        <div className="mt-4 space-y-4 flex flex-col md:flex-row flex-wrap gap-4">
          {[
            {
              icon: "🎒",
              question: "What's one thing you always pack?",
              answer: user?.profileDetails?.alwaysPack,
            },
            {
              icon: "🎶",
              question: "What's your travel soundtrack?",
              answer: user?.profileDetails?.travelSoundtrack,
            },
            {
              icon: "🎬",
              question: "One movie that makes you want to travel?",
              answer: user?.profileDetails?.favoriteTravelMovie,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-orange-400 max-w-md h-full text-white p-4 rounded-lg"
            >
              <p className="font-semibold italic">
                {item.icon} {item.question}
              </p>
              <p className="mt-1 poppins-light-italic">{item.answer}</p>
            </div>
          ))}
        </div>
        {/* Ideal Trips */}
        <div className="mt-4">
          <h2 className=" font-semibold">My ideal trips</h2>
          <div className="flex flex-wrap gap-2 p-2 border rounded-lg">
            {user?.idealTrip?.map((style) => (
              <span
                key={style}
                className="px-3 py-1 bg-orange-300 text-white rounded-full text-sm"
              >
                {style}
              </span>
            ))}
          </div>
        </div>
        {/* Questions & Answers */}
        <div className="mt-4 space-y-4 h-max flex flex-col md:flex-row flex-wrap gap-4">
          {[
            {
              icon: "🎒",
              question: "What's your action for last miute trip?",
              answer: user?.lastMinuteTripChoices,
            },
            {
              icon: "🎶",
              question: "Your ideal way to spend a free evening in a new city?",
              answer: user?.profileDetails?.idealEvening,
            },
            {
              icon: "🎬",
              question: "One movie that makes you want to travel?",
              answer: "A journal & my camera!",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-orange-400 max-w-md h-full text-white p-4 rounded-lg"
            >
              <p className="font-semibold italic">
                {item.icon} {item.question}
              </p>
              <p className="mt-1 poppins-light-italic">{item.answer}</p>
            </div>
          ))}
        </div>
        {/* Events Hosted Section */}
        <h2 className="mt-6 font-semibold text-lg">Events hosted</h2>
        <div className="w-full h-fit flex md:flex-row flex-col gap-4">
          {user.eventsHosted?.length > 0 ? (
            user.eventsHosted.map((item) => {
              return <EventCard item={item} />;
            })
          ) : (
            <div>
              <p>No trips hosted yet</p>
            </div>
          )}
        </div>

        {/* Events Attended Section */}
        <h2 className="mt-6 font-semibold text-lg">Events Attended</h2>
        {user.eventsAttended?.length > 0 ? (
          user.eventsAttended.map((item) => {
            return <EventCard item={item} />;
          })
        ) : (
          <div>
            <p>No trips hosted yet</p>
          </div>
        )}
        {/* Matches  */}
        <h2 className="mt-6 font-semibold text-lg">Matches</h2>
        <div className="w-full py-2 flex gap-4 flex-wrap">
          {matches?.map((item) => {
            return (
              <div className="h-fit w-fit flex flex-col items-center gap-2">
                <img
                  src={item?.avatar}
                  className="w-20 h-20 rounded-full"
                  alt=""
                />
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>

        <div className="w-full bg-gray-50 rounded-lg p-4 flex items-center space-x-4">
          {/* Left Column: Flag Icon */}
          <div className="text-red-500">
            <FaFlag color="orange" />
          </div>

          {/* Right Column: Text and Button */}
          <div className="flex space-y-4 flex-col gap-2">
            <span>
              {user?.flags?.length === 0
                ? "There are no flags on this user"
                : `There are ${user?.flags?.length} flags on this user`}
            </span>
            {user?.flags?.length > 0 && (
              <button className="w-fit px-3 py-1 bg-black text-white rounded-full text-sm">
                See More
              </button>
            )}
          </div>
        </div>

        <div className="w-full h-36"></div>
      </div>
    </AdminLayout>
  );
};

export default UserProfile;

const EventCard = ({ item }) => {
  return (
    <>
      <div className="mt-2 bg-white shadow-lg max-w-sm w-full rounded-lg overflow-hidden">
        <div className="w-full h-[160px] relative">
          <img
            src={item.image || "/event/hikinh.webp"} // Replace with actual hosted image
            alt="Himalayas Trek"
            className="w-full h-full object-cover"
          />
          <p className="z-50 right-4 top-4 p-1 poppins-italic text-white rounded-full px-4 bg-green-600 absolute">
            {item.eventStatus}
          </p>
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <p className="text-sm text-gray-600 flex items-center mt-1">
            📅 {formatDate(item.fromDate)}
          </p>
          <p className="text-sm text-gray-600 flex items-center mt-1">
            📍 {item.location}
          </p>
          <p className="text-sm text-gray-600 flex items-center mt-1">
            👥 Slots left : {item.availableSlots} / {item.totalSlots}
          </p>
          <div className="mt-2 flex items-center">
            <span className="bg-green-500 text-white px-2 py-1 text-xs rounded-md">
              ★ {item.rating}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

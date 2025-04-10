import React, { useEffect, useState } from "react";
import { FaInstagram, FaLinkedin, FaStar } from "react-icons/fa";
import { GrLocationPin } from "react-icons/gr";

import AdminLayout from "../Layout/AdminLayouts/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPatch } from "../utils/call";
import { formatDate } from "../utils/formatDate";
import { FaFlag } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

const FlagUserProfile = () => {
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

  const handleDelete = async () => {
    const res = await apiPatch(`/admin/unflag/${id}`);
    console.log(res);
    getProfile();
  };
  const handleBan = async () => {
    const res = await apiPatch(`/admin/users/${id}/ban`);
    console.log(res);
    alert(res.message);
    window.location.reload();
    getProfile();
  };
  const handleUnBan = async () => {
    const res = await apiPatch(`/admin/users/${id}/unban`);
    console.log(res);
    alert(res.message);
    window.location.reload();
    getProfile();
  };
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
            <div className="flex gap-2 py-2">
              <FaInstagram />
              <FaLinkedin />
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

        {/* Flag */}

        <div className="w-full my-4 bg-gray-100 rounded-lg p-4 h-fit flex items-center space-x-4">
          {/* Left Column: Flag Icon */}

          {/* Right Column: Text and Button */}
          <div className="flex space-y-4 w-full flex-col gap-2">
            <span className="flex items-center gap-4">
              <FaFlag color="orange" size={20} />
              {user?.flags?.length === 0
                ? "There are no flags on this user"
                : `There are ${user?.flags?.length} flags on this user`}
            </span>

            {user?.flags?.map((item) => {
              return (
                <div className="w-full h-fit flex gap-4 items-center">
                  <div className="w-fit h-full">
                    <img
                      src={item?.reportedBy?.avatar}
                      className="w-16 h-16 rounded-full"
                      alt=""
                    />
                  </div>
                  <div className="w-fit flex max-w-48 md:max-w-96 flex-col gap-2">
                    <p>Flagged by: {item.reportedBy.name}</p>
                    <p className="text-lg poppins-semibold">
                      Reason: {item.reason}
                    </p>
                  </div>
                </div>
              );
            })}
            {user?.flags?.length > 0 && (
              <>
                <button
                  className="bg-orange-400 text-white rounded-xl w-full py-3 px-4"
                  onClick={handleDelete}
                >
                  Remove Flags
                </button>
              </>
            )}
            {user?.isBanned ? (
              <button
                className="bg-red-500 text-white rounded-xl w-full py-3 px-4"
                onClick={handleUnBan}
              >
                Unban User
              </button>
            ) : (
              <button
                className="bg-red-500 text-white rounded-xl w-full py-3 px-4"
                onClick={handleBan}
              >
                Ban User
              </button>
            )}
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
          {matches.length > 0 ? (
            matches?.map((item) => {
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
            })
          ) : (
            <p>Nothing to show right now</p>
          )}
        </div>

        <div className="w-full h-36"></div>
      </div>
    </AdminLayout>
  );
};

export default FlagUserProfile;

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

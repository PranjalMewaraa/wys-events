import React, { useEffect, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { GrLocationPin } from "react-icons/gr";
import AdminLayout from "../Layout/AdminLayouts/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { apiGet, apiPost } from "../utils/call";
import { formatDate } from "../utils/formatDate";

const MatchingInner = () => {
  const { id1, id2 } = useParams();
  const id = id1;
  const nav = useNavigate();
  const [user, setUser] = useState({});
  const [user2, setUser2] = useState({});
  const [commons, setCommons] = useState([]);
  const [score, setScore] = useState("");
  const [reason, setReason] = useState("");
  const [showReasonModal, setShowReasonModal] = useState(false);

  useEffect(() => {
    getProfile();
    getProfile2();
    getCommons();
  }, []);

  const getProfile = async () => {
    const res = await apiGet(`/admin/user/${id}`);
    setUser(res.data);
  };

  const getProfile2 = async () => {
    const res = await apiGet(`/admin/user/${id2}`);
    setUser2(res.data);
  };

  const getCommons = async () => {
    const res = await apiGet(`/admin/matchmaking/common/${id1}/${id2}`);
    setCommons(res.data);
  };

  const handleScoreSubmit = () => {
    if (score >= 0 && score <= 100) {
      setShowReasonModal(true);
    } else {
      alert("Please enter a score between 0 and 100.");
    }
  };

  const handleFinalSubmit = async () => {
    console.log("Submitted score:", score);
    console.log("Reason:", reason);
    // You can make an API POST call here
    const res = await apiPost(`/admin/matchmaking/assign-score/${id1}/${id2}`, {
      score: score,
      reason: reason,
    });

    nav(`/admin/people/match/${id1}`);

    setScore("");
    setReason("");
    setShowReasonModal(false);
  };
  const navigate = useNavigate();
  return (
    <div className="w-full h-full bg-white mx-auto p-4 overflow-y-scroll">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)}>&larr;</button>
        <span className="font-semibold">@{user?.name}</span>
        <button>⋮</button>
      </div>

      {/* Profile Comparison */}
      <div className="flex mt-4 md:max-w-sm w-full h-fit p-2 bg-gray-100 py-4 rounded-xl justify-between gap-4 items-center">
        <div className="w-1/2 p-4 flex flex-col h-fit aspect-square overflow-hidden">
          <img
            src={user.avatar}
            className="h-full max-h-20 object-cover w-fit aspect-square rounded-full"
            alt=""
          />
          <h2 className="text-base font-bold">{user?.name}</h2>
          <div className="flex flex-col text-sm text-gray-500">
            <p>{user?.gender || "N/A"}</p>
            <p className="flex items-center">
              <GrLocationPin /> {user?.currentLocation}
            </p>
          </div>
        </div>

        <FaExchangeAlt size={16} />

        <div className="w-1/2 p-4 text-right flex flex-col items-end h-fit aspect-square overflow-hidden">
          <img
            src={user2.avatar}
            className="h-full max-h-20 object-cover w-fit aspect-square rounded-full"
            alt=""
          />
          <h2 className="text-base font-bold">{user2?.name}</h2>
          <div className="flex flex-col text-sm text-gray-500 items-end">
            <p>{user2?.gender || "N/A"}</p>
            <p className="flex items-center">
              <GrLocationPin /> {user2?.currentLocation}
            </p>
          </div>
        </div>
      </div>

      {/* Common Travel Styles */}
      <div className="mt-4">
        <h2 className="font-semibold">Common travel style</h2>
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

      {/* Common Ideal Trips */}
      <div className="mt-4">
        <h2 className="font-semibold">Common ideal trips</h2>

        <div className="flex flex-wrap gap-2 p-2 border rounded-lg">
          {commons.commonIdealTrips ? (
            commons?.commonIdealTrips?.map((style) => (
              <span
                key={style}
                className="px-3 py-1 bg-orange-300 text-white rounded-full text-sm"
              >
                {style}
              </span>
            ))
          ) : (
            <p>
              <span className="px-3 py-1 bg-orange-300 text-white rounded-full text-sm">
                Nothing
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Common Questions & Answers */}
      <div className="mt-4 space-y-4 flex flex-col md:flex-row flex-wrap gap-4">
        {[
          {
            icon: "🎒",
            question: "What's one thing you always pack?",
            answer1: commons?.user1Details?.alwaysPack,
            answer2: commons?.user1Details?.alwaysPack,
          },
          {
            icon: "🎶",
            question: "What's your travel soundtrack?",
            answer1: commons?.user1Details?.travelSoundtrack,
            answer2: commons?.user1Details?.travelSoundtrack,
          },
          {
            icon: "🎬",
            question: "One movie that makes you want to travel?",
            answer1: commons?.user1Details?.favoriteTravelMovie,
            answer2: commons?.user1Details?.favoriteTravelMovie,
          },
          {
            icon: "🌆",
            question: "Your ideal way to spend a free evening in a new city?",
            answer1: commons?.user1Details?.idealEvening,
            answer2: commons?.user1Details?.idealEvening,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-orange-400 max-w-md h-full text-white p-4 rounded-lg"
          >
            <p className="font-semibold italic">
              {item?.icon} {item?.question}
            </p>
            <div className="flex gap-4 items-center py-2">
              <div className="flex min-w-20 flex-col items-center">
                <img
                  src={commons.user1Details?.avatar}
                  className="h-10 w-10 rounded-full"
                  alt=""
                />
                <p>{commons?.user1Details?.name}</p>
              </div>
              <p className="mt-1 poppins-light-italic">"{item?.answer1}"</p>
            </div>
            <div className="flex gap-4 items-center py-2">
              <div className="flex min-w-20 flex-col items-center">
                <img
                  src={commons?.user2Details?.avatar}
                  className="h-10 w-10 rounded-full"
                  alt=""
                />
                <p>{commons?.user2Details?.name}</p>
              </div>
              <p className="mt-1 poppins-light-italic">"{item?.answer2}"</p>
            </div>
          </div>
        ))}
      </div>

      {/* Score Input */}
      <div className="w-full h-fit my-8 flex justify-center">
        <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded-2xl w-fit shadow-md">
          <div className="text-white">
            <div className="text-sm font-semibold">Score</div>
            <div className="text-xs text-gray-400">0 to 100</div>
          </div>

          <input
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            placeholder="Type here"
            className="px-4 py-2 text-center w-32 text-gray-800 bg-gray-100 rounded-xl focus:outline-none"
          />

          <button
            onClick={handleScoreSubmit}
            className="text-sm text-gray-300 hover:text-white transition duration-200"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Modal */}
      {showReasonModal && (
        <div className="fixed inset-0 z-50 bg- backdrop-blur-md bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-[90%] max-w-sm p-6 shadow-lg">
            <h2 className="text-center text-lg font-semibold mb-4">
              Reason for the score
            </h2>
            <textarea
              rows={5}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Write your reason here..."
              className="w-full bg-gray-100 p-3 rounded-lg text-sm outline-none resize-none"
            />
            <button
              onClick={handleFinalSubmit}
              className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchingInner;

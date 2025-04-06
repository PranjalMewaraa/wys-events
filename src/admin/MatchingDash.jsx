import React, { useEffect, useState } from "react";
import AdminLayout from "../Layout/AdminLayouts/AdminLayout";
import { apiGet } from "../utils/call";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

const MatchingDash = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [matches, setMatches] = useState([]);
  const [opposites, setOpposites] = useState([]);
  const [scores, setScores] = useState({});

  useEffect(() => {
    getProfile();
    getMatches();
  }, []);

  const getProfile = async () => {
    try {
      const res = await apiGet(`/admin/user/${id}`);
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user profile", err);
    }
  };

  const getMatches = async () => {
    try {
      const res = await apiGet(`/admin/matchmaking/${id}`);
      setMatches(res.data.matches);
      setOpposites(res.data.opposites);

      // Fetch compatibility scores for all matches
      const scoresObj = {};
      await Promise.all(
        res.data.matches.map(async (match) => {
          try {
            const scoreRes = await apiGet(
              `/admin/matchmaking/compatibility/${id}/${match._id}`
            );
            scoresObj[match._id] = scoreRes.data.compatibility;
          } catch (err) {
            scoresObj[match._id] = "N/A";
          }
        })
      );
      setScores(scoresObj);
    } catch (err) {
      console.error("Error fetching matches", err);
    }
  };

  return (
    <AdminLayout>
      <div className="w-full h-full bg-white mx-auto p-4 overflow-y-scroll">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button>&larr;</button>
          <div className="font-semibold flex flex-col">
            <span>@{user?.name}</span>
            <span className="poppins-light text-xs">
              Joined {formatDate(user?.createdAt)}
            </span>
          </div>
          <button>⋮</button>
        </div>

        {/* Profile Button */}
        <div className="flex w-full justify-center">
          <Link
            to={`/admin/user/profile/${id}`}
            className="bg-orange-400 p-3 poppins text-white text-sm my-4 rounded-xl"
          >
            View Profile
          </Link>
        </div>

        <div className="p-2 h-full w-full flex flex-col gap-8">
          {/* Matches */}
          <div className="py-8 w-full bg-slate-900 rounded-xl flex flex-col gap-4 p-4">
            <p className="w-full text-white text-xl text-center poppins-medium">
              Possible Matches
            </p>

            {matches.length === 0 ? (
              <p className="text-center text-white text-sm">
                No matches found.
              </p>
            ) : (
              matches.map((item) => (
                <Link
                  to={`/admin/match/${id}/${item._id}`}
                  key={item._id}
                  className="bg-gray-100 h-28 items-center p-4 rounded-xl flex justify-between"
                >
                  <div className="flex gap-3 items-center">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="rounded-full w-16 h-16 object-cover"
                    />
                    <div className="flex flex-col">
                      <p className="text-base poppins-medium">{item.name}</p>
                      <p className="text-xs max-w-28">
                        Joined: {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div
                    className="text-right text-sm font-semibold text-white rounded-xl py-4 px-2"
                    style={{
                      backgroundImage: "url('/wae.png')",
                      backgroundSize: "cover",
                      backgroundOrigin: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <span>
                      {scores[item._id] !== undefined
                        ? `${scores[item._id]}%`
                        : "Loading..."}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Opposites */}
          <div className="py-8 w-full bg-slate-900 rounded-xl flex flex-col gap-4 p-4">
            <p className="w-full text-white text-xl text-center poppins-medium">
              Possible Opposites
            </p>

            {opposites.length === 0 ? (
              <p className="text-center text-white text-sm">
                No opposites found.
              </p>
            ) : (
              opposites.map((item) => (
                <Link
                  to={`/admin/match/${id}/${item._id}`}
                  key={item._id}
                  className="bg-gray-100 h-28 items-center p-4 rounded-xl flex gap-3"
                >
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="rounded-full w-16 h-16 object-cover"
                  />
                  <div className="flex flex-col">
                    <p className="text-base poppins-medium">{item.name}</p>
                    <p className="text-xs max-w-28">
                      Joined: {formatDate(item.createdAt)}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default MatchingDash;

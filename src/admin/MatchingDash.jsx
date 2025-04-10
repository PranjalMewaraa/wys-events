import React, { useEffect, useState } from "react";
import AdminLayout from "../Layout/AdminLayouts/AdminLayout";
import { apiGet } from "../utils/call";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

const MatchingDash = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [matches, setMatches] = useState([]);
  const [opposites, setOpposites] = useState([]);
  const [scores, setScores] = useState({});
  const [scoresOpp, setScoresOpp] = useState({});
  const [searchMatch, setSearchMatch] = useState("");
  const [searchOpposite, setSearchOpposite] = useState("");

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

      const scoresObj = {};
      const scoresObjOpp = {};
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
      await Promise.all(
        res.data.opposites.map(async (match) => {
          try {
            const scoreRes = await apiGet(
              `/admin/matchmaking/compatibility/${id}/${match._id}`
            );
            scoresObjOpp[match._id] = scoreRes.data.compatibility;
          } catch (err) {
            scoresObjOpp[match._id] = "N/A";
          }
        })
      );
      setScores(scoresObj);
      setScoresOpp(scoresObjOpp);
    } catch (err) {
      console.error("Error fetching matches", err);
    }
  };

  const navigate = useNavigate();

  // Full-text search helper
  const filterBySearch = (list, searchTerm) => {
    if (!searchTerm) return list;
    return list.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredMatches = filterBySearch(matches, searchMatch);
  const filteredOpposites = filterBySearch(opposites, searchOpposite);

  return (
    <AdminLayout>
      <div className="w-full h-full bg-white mx-auto p-4 overflow-y-scroll">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)}>&larr;</button>
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

            {/* Search Matches */}
            <input
              type="text"
              placeholder="Search Matches..."
              className="w-full px-4 py-2 rounded-lg bg-white border focus:outline-none"
              value={searchMatch}
              onChange={(e) => setSearchMatch(e.target.value)}
            />

            {filteredMatches.length === 0 ? (
              <p className="text-center text-white text-sm">
                No matches found.
              </p>
            ) : (
              filteredMatches.map((item) => (
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

            {/* Search Opposites */}
            <input
              type="text"
              placeholder="Search Opposites..."
              className="w-full px-4 py-2 bg-white rounded-lg border focus:outline-none"
              value={searchOpposite}
              onChange={(e) => setSearchOpposite(e.target.value)}
            />

            {filteredOpposites.length === 0 ? (
              <p className="text-center text-white text-sm">
                No opposites found.
              </p>
            ) : (
              filteredOpposites.map((item) => (
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
                      {scoresOpp[item._id] !== undefined
                        ? `${scoresOpp[item._id]}%`
                        : "Loading..."}
                    </span>
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

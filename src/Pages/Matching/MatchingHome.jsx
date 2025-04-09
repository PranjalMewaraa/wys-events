import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { GrLocationPin } from "react-icons/gr";
import { Link } from "react-router-dom";
import Layout from "../../Layout/Layout";
import LayoutInnerMain from "../../Layout/LayoutInner";
import useMatchedUsers, { useCompatibility } from "../../utils/hooks/user";

const MatchingHome = () => {
  const { matchedUsers, loading, error } = useMatchedUsers();

  return (
    <Layout>
      <LayoutInnerMain>
        <div className="w-full h-full mb-24 bg-white mx-auto p-4 ">
          {/* Header */}
          <div className="w-full p-4 poppins-light-italic flex justify-center flex-col items-center text-2xl">
            <p>Find Seekers</p>
            <p className="text-orange-400">Find Experiences</p>
          </div>

          {/* Loader & Error */}
          {loading && <p className="text-center">Loading matches...</p>}
          {error && (
            <p className="text-center text-red-500">
              Something went wrong while fetching matches.
            </p>
          )}

          {/* No Matches */}
          {!loading && !error && matchedUsers.length === 0 && (
            <p className="text-center text-gray-400 mt-4">
              No matched users found.
            </p>
          )}
          <div className="w-full flex flex-wrap gap-6">
            {/* Matched Users */}
            {!loading &&
              matchedUsers.length > 0 &&
              matchedUsers.map((user) => <Card key={user._id} user={user} />)}
          </div>
          {/* Say Hello Button */}
          {/* <button className="mt-6 w-full bg-gray-900 text-white text-lg py-3 rounded-lg flex items-center justify-center font-medium">
            👋 Say Hello
          </button> */}
        </div>
      </LayoutInnerMain>
    </Layout>
  );
};

const Card = ({ user }) => {
  const {
    _id,
    name = "No Name",
    avatar = "https://via.placeholder.com/150",
    currentLocation = "Unknown",
    gender = "Not Specified",
    social = null,
  } = user;

  const { compatibility, loading } = useCompatibility(_id);
  const matchPercentage = compatibility?.compatibilityScore ?? "…";

  return (
    <Link
      to={`/people/detail/${_id}`}
      className="flex flex-col mt-4 max-w-sm min-w-sm w-full max-h-96 gap-4 items-center"
    >
      <div className="w-full h-full aspect-square object-fill overflow-hidden rounded-xl">
        <img
          src={avatar}
          className="h-full origin-top object-top object-cover w-full"
          alt={`${name}'s avatar`}
        />
      </div>
      <div className="flex gap-2 justify-between px-2 w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">{name}</h2>
          <div className="flex flex-wrap items-center text-sm gap-2">
            <p className="text-gray-500">{gender}</p>
            <p className="flex items-center text-gray-500">
              <GrLocationPin className="mr-1" />
              {currentLocation}
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div
            className="text-right text-sm font-semibold text-white rounded-xl py-4 px-2"
            style={{
              backgroundImage: "url('/wae.png')",
              backgroundSize: "cover",
              backgroundOrigin: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {loading ? "..." : `${matchPercentage}%`}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MatchingHome;

import Layout from "../../Layout/Layout";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Companions = () => {
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          "https://wysbackend.onrender.com/api/message/getAllFriends",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFriends(response.data);
        console.log("Friends:", response.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    fetchFriends();
  }, []);
  if (!friends) return <p className="text-center mt-10">Loading...</p>;

  return (
    <Layout>
      <div className="w-full min-h-screen flex flex-col items-center p-4 bg-white">
        <div className="max-w-lg w-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center w-full mb-4">
            <FaLongArrowAltLeft
              className="text-xl cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <p className="text-base font-medium text-center">My companions</p>
            <HiDotsHorizontal className="text-xl" />
          </div>

          {/* Grid view */}
          {friends.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {friends.map((friend, index) => (
                <div
                  key={index}
                  className=" p-3 flex flex-col items-center"
                >
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-28 h-28 rounded-xl object-cover mb-2"
                  />
                  <p className="text-base font-semibold text-center">{friend.name}</p>
                  <p className="text-xs text-gray-500 text-center mt-1">
                    Male <span className="text-red-500">📍</span> Mumbai, India
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center mt-8">
Companions coming up          </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Companions;

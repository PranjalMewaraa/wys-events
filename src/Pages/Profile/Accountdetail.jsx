import Layout from "../../Layout/Layout";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { MdCheckCircle, MdErrorOutline } from "react-icons/md";

const AccountDetail = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userID");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://wysbackend.onrender.com/api/users/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <Layout>
      <div className="w-full h-full min-h-screen flex flex-col items-center  p-4">
        <div className="max-w-sm w-full flex flex-col items-center">
          {/* Header */}
          <div className="flex justify-between items-center w-full m-4">
            <FaLongArrowAltLeft
              className="text-xl cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <p className="text-sm font-medium">Account details</p>
            <HiDotsHorizontal className="text-xl" />
          </div>

          {/* Profile */}
          <img
            src={user.avatar}
            alt="avatar"
            className="w-24 h-24 rounded-xl object-cover m-2"
          />
          <p className="text-xl font-semibold mt-2">{user.name}</p>
          <p className="text-gray-500">{user.currentLocation}</p>

          {/* Badges */}
          <div className="flex gap-3 mt-4">
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">
                {user.eventsHosted.length}
              </span>
              Events Hosted
            </div>
          </div>

          {/* Checklist with Links */}
          <div className="w-full mt-6 space-y-3 grid ">
            {[
              { label: "About you", done: true, link: "/about" },
              { label: "Phone Number", done: true, link: "/phone" },
              { label: "Travel Preferences", done: true, link: "/profile/detail/preference" },
              { label: "Companion Matching", done: true, link: "/profile/detail/matching" },
              { label: "Trust & Safety", done: false, link: "/trust-safety" },
            ].map((item, index) => (
              <Link to={item.link} key={index}>
                <div className=" bg-gray-100 rounded-lg px-4 py-3 flex justify-between items-center hover:bg-gray-200 transition-all">
                  <p className="text-sm font-medium">{item.label}</p>
                  {item.done ? (
                    <MdCheckCircle className="text-green-500 text-xl" />
                  ) : (
                    <MdErrorOutline className="text-orange-500 text-xl" />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountDetail;

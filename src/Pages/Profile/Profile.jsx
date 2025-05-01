import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../Layout/Layout";
import { FaRegUser } from "react-icons/fa";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { BsCardChecklist } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userID");
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userID");
    navigate("/signin"); // Replace with your login route
  };

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
      } catch (error) {
        localStorage.removeItem("accessToken");
        window.location.href = "/signin";
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <Layout>
      <div className="w-full h-full min-h-screen flex flex-col items-center justify-center p-4 bg-white">
        <div className="max-w-lg w-full flex items-center flex-col h-full">
          <div className="flex justify-left w-full p-3">
            <p className="poppins-black text-4xl text-left">Profile</p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-24 h-24 rounded-md object-cover"
            />
            <p className="text-xl font-semibold mt-2">{user.name}</p>
            <p className="text-gray-500">{user.currentLocation}</p>
          </div>

          <div className="w-full mt-5">
            {/* Other Profile Details */}
            <div className="border-t p-3 flex items-center gap-3">
              <Link to="/profile/detail">
                <div className="flex items-center gap-3">
                  <FaRegUser className="text-2xl" />

                  <p>Account details</p>
                </div>
              </Link>
            </div>
            <Link to="/profile/experience">
              <div className="border-t p-3 flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-calendar-check "
                  viewBox="0 0 16 16"
                >
                  <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                </svg>{" "}
                <p>My experiences</p>
              </div>
            </Link>
            <Link to="/profile/companions">
              <div className="border-t p-3 flex items-center gap-3">
                <LiaUserFriendsSolid className="text-2xl" />
                <p>My companions</p>
              </div>
            </Link>
            <Link to="/profile/listing">
              <div className="border-t p-3 flex items-center gap-3">
                <BsCardChecklist className="text-2xl" />
                <p>My listings</p>
              </div>
            </Link>
            <div className="border-t p-3 flex items-center gap-3">
              <MdErrorOutline className="text-2xl" />
              <button
                onClick={handleLogout}
                className=" bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="text-left w-full">
            <p className="mt-5 italic text-gray -700 text-2xl ">
              Places worth <span className="text-orange-500">going</span>,
              <br></br> People worth{" "}
              <span className="text-orange-500">knowing</span>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

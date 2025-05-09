import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../Layout/Layout";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaX, FaXTwitter } from "react-icons/fa6";
import { MdErrorOutline } from "react-icons/md";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate, Link } from "react-router-dom";
import { CiCircleCheck } from "react-icons/ci";
const Trust = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userID");
  const navigate = useNavigate();

  const [displaySocials, setDisplaySocials] = useState({
    linkedin: true,
    instagram: false,
    twitter: false,
  });

  const socials = {
    linkedin: "linkedin.com/aditi",
    instagram: "instagram.com/",
    twitter: "x.com/",
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
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <Layout>
      <div className="w-full min-h-screen flex flex-col items-center justify-start p-4 bg-white">
        <div className="max-w-lg w-full flex flex-col items-center">
          {/* Profile Info */}
          <div className="flex justify-between items-center w-full m-4">
            <FaLongArrowAltLeft
              className="text-xl cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <p className="text-sm font-medium">Account details</p>
            <HiDotsHorizontal className="text-xl" />
          </div>

          {/* My verification status */}
          <div className="w-full mt-8">
            <p className="font-semibold text-lg flex items-center gap-1">
              My verification status{" "}
              {user?.trustVerification ? (
                <CiCircleCheck className="text-green-500" />
              ) : (
                <MdErrorOutline className="text-orange-500" />
              )}
            </p>
            <div
              className={`${
                user.trustVerification
                  ? "bg-green-100 border-green-300"
                  : "bg-orange-100 border-orange-300"
              }  border  rounded-2xl mt-2 p-4 flex flex-col gap-2`}
            >
              <div className="text-sm font-medium text-orange-800">
                {user.trustVerification
                  ? "✅  Verified user"
                  : "🚀  Not necessary, I trust good vibes"}
              </div>
            </div>
          </div>

          {/* My socials */}
          <div className="w-full mt-8">
            <p className="font-semibold text-lg mb-4">My socials</p>

            {user?.socialLinks?.instagram && (
              <div className="border rounded-2xl px-4 py-3 flex flex-col mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FaInstagram className="text-xl text-black" />
                    <p className="text-sm">{user?.socialLinks?.instagram}</p>
                    {!user.socialLinks?.instagram.includes(".com/") ||
                    user.socialLinks?.instagram.endsWith("/") ? (
                      <MdErrorOutline className="text-orange-500 text-base" />
                    ) : null}
                  </div>
                </div>
              </div>
            )}
            {user?.socialLinks?.linkedin && (
              <div className="border rounded-2xl px-4 py-3 flex flex-col mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FaLinkedinIn className="text-xl text-black" />
                    <p className="text-sm">{user?.socialLinks?.linkedin}</p>
                    {!user.socialLinks?.linkedin.includes(".com/") ||
                    user.socialLinks?.linkedin.endsWith("/") ? (
                      <MdErrorOutline className="text-orange-500 text-base" />
                    ) : null}
                  </div>
                </div>
              </div>
            )}
            {user?.socialLinks?.x && (
              <div className="border rounded-2xl px-4 py-3 flex flex-col mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FaXTwitter className="text-xl text-black" />
                    <p className="text-sm">{user?.socialLinks?.x}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tagline */}
        </div>
      </div>
    </Layout>
  );
};

export default Trust;

import Layout from "../../Layout/Layout";
import { HiDotsHorizontal } from "react-icons/hi";
import BackButton from "../../utils/backbutton";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiPlus } from "react-icons/fi";

const Section = ({ title, description, items }) => (
    <div>
        <div className="  rounded-2xl p-4">
        <p className="font-semibold text-md">{title}</p>
        </div>
    
  <div className="mb-6 border rounded-2xl p-4">
    
    <div className="flex justify-between items-center mb-2">
      <div>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <FiPlus className="text-gray-600" />
    </div>
    <div className="flex flex-wrap gap-2 mt-2">

      {items?.map((item, index) => (
        <span
          key={index}
          className="bg-orange-400 text-white text-xs font-medium px-3 py-1 rounded-full"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
  </div>
);

const Travelpreference = () => {
  const [user, setUser] = useState(null);

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
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <Layout>
      <div className="w-full h-full min-h-screen flex flex-col items-center justify-start p-4 bg-white">
        <div className="max-w-lg w-full flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center w-full p-3">
            <BackButton />
            <p className="text-base text-center font-medium">Travel Preferences</p>
            <HiDotsHorizontal className="text-xl" />
          </div>

          {/* Sections */}
          <Section
  title="How do you love to travel?"
  description="Add or change your preferences"
  items={Array.isArray(user.travelPreferences) ? user.travelPreferences : []}
/>
<Section
  title="What's your ideal trip?"
  description="Add or change your preferences"
  items={Array.isArray(user.idealTrip) ? user.idealTrip : []}
/>
<Section
  title="What's your travel energy?"
  description="Add or change your preferences"
  items={[user.travelEnergy]}
/>

        </div>
      </div>
    </Layout>
  );
};

export default Travelpreference;

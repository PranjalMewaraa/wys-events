import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../Layout/Layout";

const Profile = () => {
  const [user, setUser] = useState(null);
  const userId = "67ea5b11c9d32c866c85b4c8"; // Replace with actual user ID
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://wysbackend.onrender.com/api/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

//   if (!user) return <p>Loading...</p>;

  return (
    <Layout>
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <div className="max-w-lg w-full flex items-center flex-col h-full">
        <div className="flex justify-left w-full p-3">
          <p className="poppins-black text-4xl text-left">Profile</p>
        </div>

        {/* <div className="flex flex-col items-center">
          <img src={user.avatar} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
          <p className="text-xl font-semibold mt-2">{user.name}</p>
          <p className="text-gray-500">{user.currentLocation}</p>
        </div> */}

        <div className="w-full mt-5">
          <div className="border-t p-3 flex items-center gap-3">
            <div className="flex"><span>📋</span>
             <p>Account details</p>
             </div>
          </div>
          <div className="border-t p-3 flex items-center gap-3">
            <span>📅</span> <p>My experiences</p>
          </div>
          <div className="border-t p-3 flex items-center gap-3">
            <span>👥</span> <p>My companions</p>
          </div>
          <div className="border-t p-3 flex items-center gap-3">
            <span>📦</span> <p>My listings</p>
          </div>
          <div className="border-t p-3 flex items-center gap-3">
            <span>ℹ️</span> <p>About us</p>
          </div>
        </div>

        <p className="mt-5 italic text-gray-700">
          Places worth <span className="text-orange-500">going</span>, People worth <span className="text-orange-500">knowing</span>
        </p>
      </div>
    </div>
    </Layout>
  );
};

export default Profile;

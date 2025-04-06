import Layout from "../../Layout/Layout";
import EventCard from "./EventCard";
import { HiDotsHorizontal } from "react-icons/hi";
import BackButton from "../../utils/backbutton";
import { useEffect, useState } from "react";
import axios from "axios";

const Experience = () => {
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
            <p className="text-base text-center font-medium">My Experience</p>
            <HiDotsHorizontal className="text-xl" />
          </div>

          {/* Event List */}
          <div className="mt-4 space-y-4">
  {user.eventsAttended && user.eventsAttended.length > 0 ? (
    user.eventsAttended.map((eventId, index) => (
      <EventCard key={index} eventId={eventId} />
    ))
  ) : (
    <p className="text-gray-500 text-sm text-center mt-8">
      You haven’t attended any events yet.
    </p>
  )}
</div>

        </div>
      </div>
    </Layout>
  );
};

export default Experience;

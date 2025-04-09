import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaMoneyBill1Wave, FaStar } from "react-icons/fa6";
import { FiTarget } from "react-icons/fi";
import { MdDateRange, MdLocationOn } from "react-icons/md";
import Layout from "../../Layout/Layout";
import LayoutInnerMain from "../../Layout/LayoutInner";
import { useParams } from "react-router-dom";
import useEventDetails from "../../utils/hooks/event";
import { eventRequest } from "../../utils/api";

const EventDetail = () => {
  const { eventId } = useParams();
  const { event } = useEventDetails(eventId);
  const [joining, setJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [message, setMessage] = useState(null);
  const [userId, setUserId] = useState("");


  const [reqStatus, setReqStatus] = useState();

  useEffect(() => {
    setUserId(localStorage.getItem("userID"));
    function checkParticipantStatus(participants = [], userId) {
      console.log(participants);
      console.log(userId);
      if (!Array.isArray(participants) || participants.length === 0) {
        return { isPresent: false, status: null };
      }

      const match = participants.find((p) => p.user === userId);
      setHasJoined(!!match);
      return {
        isPresent: !!match,
        status: match?.requestStatus || null,
      };
    }
    if (event) {
      setReqStatus(checkParticipantStatus(event.participants, userId));
    }
  }, [event]);
    const handleJoin = async () => {
    setMessage(null);
    setJoining(true);
    try {
      const response = await eventRequest(eventId);

      // Use status from the actual axios response (e.g., response.status === 200)

      setHasJoined(true);
      setMessage("Request sent successfully.");
      window.location.reload;
      setReqStatus(checkParticipantStatus(event.participants, userId));

      console.log("Join response:", response);
    } catch (err) {
      setMessage("Failed to send join request.");
      console.error("Join error:", err);
    } finally {
      setJoining(false);
    }
  };

  console.log(reqStatus);
  return (
    <Layout>
      <LayoutInnerMain>
        {event && (
          <div className="flex overflow-hidden pb-28 p-4 flex-col h-fit rounded-xl max-w-7xl bg-white">
            <img
              src="https://imgs.search.brave.com/Ah4hMz04IJ9Ncii-qAm0qbYmbCSl4MkNgTVHNBI9yF8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9hL2E5L0hp/a2luZ190b190aGVf/SWNlX0xha2VzLl9T/YW5fSnVhbl9OYXRp/b25hbF9Gb3Jlc3Ql/MkNfQ29sb3JhZG8u/anBn"
              alt="hiking"
              className="h-1/2 max-h-72 rounded-xl"
            />

            <div className="w-full h-1/2 flex-col gap-4 py-4">
              <div className="flex text-2xl mb-4 items-center justify-between w-full">
                <p>{event.name}</p>
                {event.createdBy === userId ? (
                  <div>
                    <p className="p-4 py-2 md:py-4 md:px-6 text-sm md:text-base text-yellow-500  rounded-full disabled:opacity-50">
                      Event created by you
                    </p>
                  </div>
                ) : event.eventStatus === "ongoing" ? (
                  <button
                    onClick={handleJoin}
                    disabled={joining || hasJoined}
                    className="p-4 py-2 md:py-4 md:px-6 text-sm md:text-base text-yellow-500 border border-yellow-500 rounded-full disabled:opacity-50"
                  >
                    {hasJoined && reqStatus.status === "requested"
                      ? "Request sent"
                      : hasJoined && reqStatus.status === "accepted"
                      ? "Joined"
                      : "Request to join"}
                  </button>
                ) : (
                  <div>
                    <p className="p-4 py-2 md:py-4 md:px-6 text-sm md:text-base text-yellow-500 border border-yellow-500 rounded-full disabled:opacity-50">
                      {event.eventStatus}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 py-4">
                <p className="flex text-base gap-2 items-center">
                  <MdDateRange size={18} />
                  {new Date(event.fromDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  • {event.time}
                </p>
                <p className="flex text-base gap-2 items-center">
                  <MdLocationOn size={18} />
                  {event.location}
                </p>
                <p className="flex text-sm md:max-w-1/2 gap-2 leading-4 text-gray-500 items-center">
                  {event.description}
                </p>
                <div className="flex justify-between gap-4 flex-wrap">
                  <p className="flex text-base gap-2 items-center">
                    <FiTarget size={18} />
                    Total Slots {event.totalSlots} |{" "}
                    <span className="text-green-600">
                      {event.availableSlots} slots available
                    </span>
                  </p>
                  <p className="flex text-base gap-2 items-center">
                    <FaMoneyBill1Wave size={18} />
                    Rs {event.cost} per person
                  </p>
                </div>
                <div className="w-full md:w-1/2 border-t border-b flex justify-between py-2">
                  <div className="flex gap-4 items-center">
                    <FaRegUserCircle size={28} />
                    <div>
                      <p>John Doe</p>
                      <p className="text-sm">active since 2025</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-14 rounded-xl h-full flex justify-center text-white bg-green-500 bg-center bg-cover items-center">
                      69%
                    </div>
                    <div className="w-14 text-xs flex-col rounded-xl h-full flex justify-center text-white bg-green-700 bg-center bg-cover items-center">
                      <p>Rating</p>
                      <p className="flex items-center">
                        <FaStar color="gold" className="bg-gol" />{" "}
                        {event.rating}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </LayoutInnerMain>
    </Layout>
  );
};

export default EventDetail;

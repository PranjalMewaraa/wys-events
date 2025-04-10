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
import { useCompatibility } from "../../utils/hooks/user";
import { apiGet } from "../../utils/call";
import { BsCashStack } from "react-icons/bs";

const EventDetail = () => {
  const { eventId } = useParams();
  const { event, setEvent } = useEventDetails(eventId); // Make sure useEventDetails returns setEvent too
  const [joining, setJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [message, setMessage] = useState(null);
  const [userId, setUserId] = useState("");
  const [creator, setCreator] = useState({});
  const [reqStatus, setReqStatus] = useState();

  const { compatibility } = useCompatibility(creator._id);
  const matchPercentage = compatibility?.compatibilityScore ?? "…";

  useEffect(() => {
    setUserId(localStorage.getItem("userID"));
  }, []);

  useEffect(() => {
    if (event) {
      setReqStatus(checkParticipantStatus(event.participants, userId));
      setHasJoined(
        checkParticipantStatus(event.participants, userId).isPresent
      );
      getProfile();
    }
  }, [event, userId]);

  const checkParticipantStatus = (participants = [], userId) => {
    if (!Array.isArray(participants) || participants.length === 0) {
      return { isPresent: false, status: null };
    }
    const match = participants.find((p) => p.user === userId);
    return {
      isPresent: !!match,
      status: match?.requestStatus || null,
    };
  };

  const getProfile = async () => {
    if (!event?.createdBy) return;
    try {
      const response = await apiGet(`/users/${event.createdBy}`);
      setCreator(response.data);
    } catch (err) {
      console.error("Failed to fetch creator profile", err);
    }
  };

  const handleJoin = async () => {
    setMessage(null);
    setJoining(true);
    try {
      const response = await eventRequest(eventId);

      const newParticipant = {
        user: userId,
        requestStatus: "requested",
      };

      const updatedEvent = {
        ...event,
        participants: [...(event.participants || []), newParticipant],
      };

      setEvent(updatedEvent); // Update locally
      setHasJoined(true);
      const status = checkParticipantStatus(updatedEvent.participants, userId);
      setReqStatus(status);
      setMessage("Request sent successfully.");
    } catch (err) {
      setMessage("Failed to send join request.");
      console.error("Join error:", err);
    } finally {
      setJoining(false);
    }
  };

  return (
    <Layout>
      <LayoutInnerMain>
        {event && (
          <div className="flex overflow-hidden pb-28 p-4 w-full flex-col h-fit rounded-xl max-w-7xl md:max-w-full bg-white">
            <img
              src={event.image || "/event/hikinh.webp"}
              alt="hiking"
              className="h-1/2 max-h-72 w-full object-center object-cover rounded-xl"
            />

            <div className="w-full h-1/2 flex-col gap-4 py-4">
              <div className="flex text-2xl mb-4 items-center justify-between w-full">
                <p>{event.name}</p>
                {event.createdBy === userId ? (
                  <div>
                    <p className="p-4 py-2 md:py-4 md:px-6 text-sm md:text-base text-yellow-500 rounded-full disabled:opacity-50">
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

                <div className="flex justify-between gap-4 flex-wrap">
                  <p className="flex text-base gap-2 items-center">
                    <FiTarget size={18} />
                    Total Slots {event.totalSlots} |{" "}
                    <span className="text-green-600">
                      {event.availableSlots} slots available
                    </span>
                  </p>
                  {event.paymentType !== "fee" ? (
                    <p className="flex items-center gap-4">
                      {" "}
                      <BsCashStack />
                      Go {event.paymentType}
                    </p>
                  ) : (
                    <p className="flex gap-2  items-center">
                      <BsCashStack />
                      Rs. {event.cost} per person
                    </p>
                  )}
                </div>
                <div className="w-full md:w-1/2 border-t border-b flex justify-between py-2">
                  <div className="flex gap-4 items-center">
                    <img
                      src={creator.avatar}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p>{creator.name}</p>
                      <p className="text-sm">
                        Hosted {creator?.eventsHosted?.length} events
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    {userId !== creator._id && (
                      <div
                        className="text-right text-sm font-semibold text-white rounded-xl py-4 px-2"
                        style={{
                          backgroundImage: "url('/wae.png')",
                          backgroundSize: "cover",
                          backgroundOrigin: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      >
                        {matchPercentage}%
                      </div>
                    )}

                    <div className="w-14 text-xs flex-col rounded-xl h-full flex justify-center text-white bg-green-700 bg-center bg-cover items-center">
                      <p>Rating</p>
                      <p className="flex items-center">
                        <FaStar color="gold" className="bg-gol" />{" "}
                        {event.rating}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="flex text-sm md:max-w-1/2 gap-2 leading-4 text-gray-500 items-center">
                  {event.description}
                </p>
              </div>
              {message && (
                <p className="mt-2 text-center text-sm text-blue-600">
                  {message}
                </p>
              )}
            </div>
          </div>
        )}
      </LayoutInnerMain>
    </Layout>
  );
};

export default EventDetail;

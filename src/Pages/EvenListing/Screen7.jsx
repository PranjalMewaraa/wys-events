import * as React from "react";
import Layout from "../../Layout/Layout";
import { useState, useEffect } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import { formatDatewithoutTime } from "../../utils/formatDate";
import { apiGet, apiPost } from "../../utils/call";
import { BsCashStack } from "react-icons/bs";
import { SiTicktick } from "react-icons/si";
import { leaveEvent } from "../../utils/api";

function EventListing7() {
  const [showFullDescription, setShowFullDescription] = React.useState(false);
  const { id } = useParams();
  const [event, setEvent] = useState();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [lastFeedback, setLastFeedback] = useState(null);
  const [creator, setCreator] = useState({});

  const fetchHost = async () => {
    if (event?.createdBy) {
      const res = await apiGet(`/users/${event.createdBy}`);
      setCreator(res.data);
    }
  };

  const handleModal = () => {
    const currentDate = new Date().toISOString();

    console.log(currentDate);
    const eventEndData = event.toDate;
    if (currentDate < eventEndData) {
      alert("You can share your experience only once the event ends");
    } else {
      setShowFeedbackModal(true);
    }
  };
  const fetchEvent = async () => {
    const res = await apiGet(`/events/${id}`);
    setEvent(res);
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  useEffect(() => {
    fetchHost();
  }, [event]);

  const postFeedBack = async (data) => {
    const res = await apiPost(`/review/${id}/post`, data);
    alert(res.message);
  };
  const handleFeedbackSubmit = (data) => {
    console.log("Parent received feedback:", data);
    setLastFeedback(data);
    postFeedBack(data);
  };
  const navigate = useNavigate();
  const handleLeaveEvent = async () => {
    await leaveEvent(event._id);
    alert("You have successfully left the event");
    navigate("/listing");
  };

  return (
    <Layout>
      <article
        className="flex flex-col mb-28 mx-auto py-4 w-full max-w-[480px]"
        role="article"
      >
        <div className="flex overflow-hidden flex-col items-start justify-between px-2 w-full bg-white">
          {/* Title + Icon */}
          <div className="flex gap-5 w-full justify-between mt-2  max-w-full text-xs tracking-tight leading-8 text-black ">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/964fce9e1c634c03ead4985407efc211a748b06a"
              alt="Trek icon"
              className="object-contain shrink-0 my-auto aspect-[1.21] w-[17px]"
            />
            <h1 className="text-xs">{event?.name}</h1>
            <p className="text-sm text-red-600" onClick={handleLeaveEvent}>
              Leave Event
            </p>
          </div>

          {/* Main Image */}
          <img
            src={event?.image || "/event/hikinh.webp"}
            alt={`${event?.image} landscape`}
            className="object-cover rounded-t-2xl self-center mt-8 w-full max-h-64"
          />

          {/* Title & Share Button */}
          <section className="flex gap-5 justify-between self-center mt-3 w-full px-4">
            <h2 className="text-xl tracking-tight leading-relaxed text-black">
              {event?.name}
            </h2>
            <button
              onClick={handleModal}
              className="self-start px-2.5 py-2.5 text-xs tracking-tight text-center text-amber-500 rounded-3xl border border-amber-500 border-solid"
              disabled={event?.status === "rejected"}
            >
              Share your experience
            </button>
          </section>

          {/* Details */}
          <section
            className="flex flex-col gap-2 mt-3 ml-5"
            aria-label="event details"
          >
            <div className="flex gap-2 items-center text-xs text-black">
              📅 <time>{formatDatewithoutTime(event?.fromDate)}</time> ⏰{" "}
              <time>{event?.time}</time>
            </div>
            <div className="flex gap-2 text-xs text-black">
              📍 <address className="not-italic">{event?.location}</address>
            </div>
            <div className="flex gap-2 items-start text-xs">
              👥
              <div className="flex gap-1 text-black">
                <span>Total Slots:</span>
                <span>{event?.totalSlots}</span>
              </div>
              <div className="flex gap-1 text-green-800">
                <span>Available:</span>
                <span>{event?.availableSlots}</span>
              </div>
            </div>
            {event?.paymentType !== "fee" ? (
              <p className="flex items-center gap-4">
                <BsCashStack />
                Go {event?.paymentType}
              </p>
            ) : (
              <p className="flex gap-2 items-center">
                <BsCashStack />
                Rs. {event?.cost} per person
              </p>
            )}
          </section>

          {/* Organizer */}
          <section className="flex gap-10 self-center py-1.5 pr-3 pl-1 mt-5 w-full border-t border-b border-zinc-800 px-4 justify-between">
            <div className="flex flex-1 gap-2.5 mt-1.5 text-black">
              <img
                src={creator?.avatar}
                className="w-8 h-8 rounded-full bg-zinc-300"
              />
              <div className="flex flex-col">
                <div className="text-xs">{creator?.name}</div>
                <div className="mt-2.5 text-xs">
                  From {creator?.currentLocation}
                </div>
              </div>
            </div>
            <div className="flex flex-1 gap-2 justify-end text-white whitespace-nowrap">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/89f188d1d9db5f5275ec7b0010a5b27d8d712d07"
                alt="Rating badge"
                className="w-[46px] aspect-[1.12]"
              />
              <div className="px-3 py-2 bg-green-800 rounded-xl">
                <div className="text-xs">Rating</div>
                <div className="flex gap-0.5 text-xs">
                  <span>{event?.rating}</span>⭐
                </div>
              </div>
            </div>
          </section>

          {/* Description */}
          <section
            className="self-center w-full px-5 mt-5"
            aria-label="event description"
          >
            <p className="text-xs tracking-tight text-black">
              {showFullDescription
                ? event?.description
                : `${event?.description?.slice(0, 100)}...`}
            </p>
            <button
              className="mt-2 text-xs tracking-tight text-black"
              onClick={() => setShowFullDescription((prev) => !prev)}
            >
              {showFullDescription ? "Read Less" : "Read More"}
            </button>
          </section>

          {/* Rejected or Attendees */}
          {event?.status === "rejected" ? (
            <section className="mt-10 bg-red-100 border border-red-400 rounded-lg mx-4 px-4 py-5">
              <h3 className="text-red-700 font-semibold text-lg mb-2">
                🚫 Event Rejected
              </h3>
              <p className="text-sm text-red-600">
                <span className="font-semibold">Reason:</span>{" "}
                {event?.rejectionReason || "Not specified"}
              </p>
            </section>
          ) : (
            <>
              <div className="mt-6">
                <p className="flex gap-2 items-center text-lg font-semibold">
                  🧑‍💼 Seekers
                </p>
                <div className="flex flex-col w-full gap-2 mt-2">
                  {event?.participants?.filter(
                    (p) => p?.requestStatus === "requested"
                  ).length > 0 ? (
                    event?.participants
                      .filter((p) => p?.requestStatus === "requested")
                      .map((item) => (
                        <div
                          key={item.user?._id}
                          className="w-full flex items-center gap-4"
                        >
                          <img
                            src={item.user?.avatar}
                            alt={item.user?.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium">
                              {item.user?.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              Location: {item.user?.currentLocation || "N/A"}
                            </p>
                          </div>
                        </div>
                      ))
                  ) : (
                    <p className="text-gray-500 text-sm">No seekers yet.</p>
                  )}
                </div>
              </div>
              {event?.participants?.length > 0 ? (
                <>
                  {/* ✅ GOING */}
                  <div className="mt-6">
                    <p className="flex gap-2 items-center text-lg font-semibold">
                      ✅ Going <SiTicktick color="orange" />
                    </p>
                    <div className="flex flex-col w-full gap-2 mt-2">
                      {event?.participants.filter(
                        (p) => p?.rsvpStatus === "yes"
                      ).length > 0 ? (
                        event?.participants
                          .filter((p) => p?.rsvpStatus === "yes")
                          .map((item) => (
                            <Link
                              to={`/people/detail/${item?.user?._id}`}
                              key={item.user?._id}
                              className="w-full flex items-center gap-4"
                            >
                              <img
                                src={item?.user?.avatar}
                                alt={item?.user?.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div>
                                <p className="text-sm font-medium">
                                  {item?.user?.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Location:{" "}
                                  {item.user?.currentLocation || "N/A"}
                                </p>
                              </div>
                            </Link>
                          ))
                      ) : (
                        <p className="text-gray-500 text-sm">
                          No one confirmed yet.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 🤔 THINKING */}
                  {/* 🧑‍💼 Seekers */}

                  {/* 🤔 Thinking About It */}
                  <div className="mt-6">
                    <p className="flex gap-2 items-center text-lg font-semibold">
                      🤔 Thinking About It
                    </p>
                    <div className="flex flex-col w-full gap-2 mt-2">
                      {event?.participants?.filter(
                        (p) =>
                          p?.rsvpStatus !== "yes" &&
                          p?.requestStatus !== "requested"
                      ).length > 0 ? (
                        event?.participants
                          ?.filter(
                            (p) =>
                              p?.rsvpStatus !== "yes" &&
                              p?.requestStatus !== "requested"
                          )
                          .map((item) => (
                            <Link
                              to={`/people/detail/${item.user?._id}`}
                              key={item.user?._id}
                              className="w-full flex items-center gap-4"
                            >
                              <img
                                src={item.user?.avatar}
                                alt={item.user?.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div>
                                <p className="text-sm font-medium">
                                  {item.user?.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Location:{" "}
                                  {item.user?.currentLocation || "N/A"}
                                </p>
                              </div>
                            </Link>
                          ))
                      ) : (
                        <p className="text-gray-500 text-sm">
                          No one thinking about it yet.
                        </p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-gray-500 text-sm mt-4">
                  No participants till now.
                </p>
              )}
            </>
          )}
        </div>
      </article>

      <EventFeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        onSubmit={handleFeedbackSubmit}
      />
    </Layout>
  );
}

export default EventListing7;

// ---------------------- Feedback Modal ----------------------
const EventFeedbackModal = ({ isOpen, onClose, onSubmit }) => {
  const [eventHappened, setEventHappened] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setEventHappened(null);
      setRating(0);
      setFeedback("");
    }
  }, [isOpen]);

  const handleSubmit = () => {
    const response = {
      eventOccured: eventHappened,
      rating: parseFloat(rating),
      review: feedback,
    };
    onSubmit(response);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">
        <h1 className="text-lg italic font-semibold mb-4 text-center">
          Share your <span className="text-orange-400">Experience</span>
        </h1>
        <h2 className="text-lg font-semibold mb-4 text-center">
          Did the event happen?
        </h2>

        {!eventHappened && eventHappened !== false && (
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setEventHappened(true)}
              className="px-6 py-2 rounded-full border border-yellow-500 text-yellow-500"
            >
              Yes
            </button>
            <button
              onClick={() => setEventHappened(false)}
              className="px-6 py-2 border-black border rounded-full text-black"
            >
              No
            </button>
          </div>
        )}

        {(eventHappened === true || eventHappened === false) && (
          <div className="mt-4 text-center">
            <p className="mb-2">Rate your experience:</p>
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className={`text-2xl transition-colors ${
                    star <= (hover || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            {rating > 0 && (
              <>
                <textarea
                  className="w-full p-3 rounded-lg border border-gray-300 text-sm mb-4"
                  rows={4}
                  placeholder="Leave your feedback here..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                <button
                  onClick={handleSubmit}
                  className="bg-zinc-800 text-white px-4 py-2 rounded-xl w-full"
                >
                  Submit
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

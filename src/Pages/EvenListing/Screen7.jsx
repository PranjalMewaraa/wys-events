import * as React from "react";
import Layout from "../../Layout/Layout";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatDatewithoutTime } from "../../utils/formatDate";
import { apiGet } from "../../utils/call";

function EventListing7() {
  const [showFullDescription, setShowFullDescription] = React.useState(false);
  const { id } = useParams();
  const [event, setEvent] = useState();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [lastFeedback, setLastFeedback] = useState(null);
  const [creator, setCreator] = useState({});

  const fetchHost = async () => {
    const res = await apiGet(`/users/${event.createdBy}`);
    console.log(res);
    setCreator(res.data);
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

  const handleFeedbackSubmit = (data) => {
    console.log("Parent received feedback:", data);
    setLastFeedback(data);
  };

  return (
    <Layout>
      <article
        className="flex flex-col mb-28 mx-auto py-4 w-full max-w-[480px]"
        role="article"
      >
        <div className="flex overflow-hidden flex-col items-start px-2 w-full bg-white">
          {/* Title + Icon */}
          <div className="flex gap-5 justify-between mt-2 ml-8 max-w-full text-xs tracking-tight leading-8 text-black w-[199px]">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/964fce9e1c634c03ead4985407efc211a748b06a"
              alt="Trek icon"
              className="object-contain shrink-0 my-auto aspect-[1.21] w-[17px]"
            />
            <h1 className="text-xs">{event?.name}</h1>
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
              onClick={() => setShowFeedbackModal(true)}
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
            <div className="flex gap-2 text-xs text-black">
              💸 <span>Rs. {event?.cost} per person</span>
            </div>
          </section>

          {/* Organizer */}
          <section className="flex gap-10 self-center py-1.5 pr-3 pl-1 mt-5 w-full border-t border-b border-zinc-800 px-4 justify-between">
            <div className="flex flex-1 gap-2.5 mt-1.5 text-black">
              <img
                src={creator.avatar}
                className="w-8 h-8 rounded-full bg-zinc-300"
              />
              <div className="flex flex-col">
                <div className="text-xs">{creator.name}</div>
                <div className="mt-2.5 text-xs">
                  active since {creator.currentLocation}
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

          {/* Rejected Message OR Attendees */}
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
              {/* Going List */}
              <section className="mt-10" aria-label="Going List">
                <h3 className="ml-6 text-base tracking-tight text-black">
                  ✅ Going
                </h3>
                <div className="px-4">
                  {event?.participants.filter((p) => p.rsvpStatus === "yes")
                    .length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No one confirmed yet.
                    </p>
                  ) : (
                    event?.participants
                      .filter((p) => p.rsvpStatus === "yes")
                      .map((attendee, idx) => (
                        <div
                          key={idx}
                          className="flex gap-2.5 items-center mt-3 bg-white rounded-lg px-2 py-1"
                        >
                          <img
                            src={attendee.user?.avatar || "/avatar.png"}
                            alt={attendee.user?.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-black">
                              {attendee.user?.name || "Anonymous"}
                            </p>
                            <p className="text-xs text-zinc-600">
                              Joined on{" "}
                              {formatDatewithoutTime(attendee.user?.createdAt)}
                            </p>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </section>

              {/* Thinking List */}
              <section className="mt-6" aria-label="Thinking List">
                <h3 className="ml-6 text-base tracking-tight text-black">
                  🤔 Thinking About It
                </h3>
                <div className="px-4">
                  {event?.participants.filter((p) => p.rsvpStatus !== "yes")
                    .length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No one is unsure yet.
                    </p>
                  ) : (
                    event?.participants
                      .filter((p) => p.rsvpStatus !== "yes")
                      .map((attendee, idx) => (
                        <div
                          key={idx}
                          className="flex gap-2.5 items-center mt-3 bg-white rounded-lg px-2 py-1"
                        >
                          <img
                            src={attendee.user?.avatar || "/avatar.png"}
                            alt={attendee.user?.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-black">
                              {attendee.user?.name || "Anonymous"}
                            </p>
                            <p className="text-xs text-zinc-600">
                              Joined on{" "}
                              {formatDatewithoutTime(attendee.user?.createdAt)}
                            </p>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </section>
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
    const response = { eventHappened, rating, feedback };
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

import * as React from "react";
import Layout from "../../Layout/Layout";
import { useState, useEffect } from "react";
function EventListing7() {
  const [showFullDescription, setShowFullDescription] = React.useState(false);

  const eventData = {
    title: "Himalayas Trek",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/72a84b3b87ebcb652fb5099e874e8c8e8e5b8604",
    date: "26 Jun 2025",
    time: "8:00 AM",
    location: "Praygraj, Uttarakhand",
    totalSlots: 7,
    availableSlots: 2,
    price: 3000,
    organizer: {
      name: "Jhone Doe",
      since: "2025",
      rating: 4.2,
    },
    description:
      "Description about the event, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
    attendees: [
      {
        name: "Aditi Wanderlust",
        joinedDate: "12 May 2025",
        profilePic:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/8930b25fd82d14c27cb2e6e564185fca344485f1",
      },
    ],
  };

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [lastFeedback, setLastFeedback] = useState(null);

  const handleFeedbackSubmit = (data) => {
    console.log("Parent received feedback:", data);
    setLastFeedback(data);

    // You can also send to backend here
    // await api.post('/feedback', data);
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
            <h1 className="text-xs">{eventData.title}</h1>
          </div>

          {/* Main Image */}
          <img
            src={eventData.image}
            alt={`${eventData.title} landscape`}
            className="object-cover rounded-t-2xl self-center mt-8 w-full rounded-none  max-h-64"
          />

          {/* Title & Share Button */}
          <section className="flex gap-5 justify-between self-center mt-3 w-full ">
            <h2 className="text-xl tracking-tight leading-relaxed text-black">
              {eventData.title}
            </h2>
            <button
              onClick={() => setShowFeedbackModal(true)}
              className="self-start px-2.5 py-2.5 text-xs tracking-tight text-center text-amber-500 rounded-3xl border border-amber-500 border-solid"
            >
              Share your experience
            </button>
          </section>

          {/* Details */}
          <section
            className="flex flex-col gap-2 mt-3 ml-5"
            aria-label="Event details"
          >
            <div className="flex gap-2 items-center text-xs text-black">
              📅 <time>{eventData.date}</time> ⏰ <time>{eventData.time}</time>
            </div>
            <div className="flex gap-2 text-xs text-black">
              📍 <address className="not-italic">{eventData.location}</address>
            </div>
            <div className="flex gap-2 items-start text-xs">
              👥
              <div className="flex gap-1 text-black">
                <span>Total Slots</span>
                <span>{eventData.totalSlots}</span>
              </div>
              <div className="flex gap-1 text-green-800">
                <span>Slots Available</span>
                <span>{eventData.availableSlots}</span>
              </div>
            </div>
            <div className="flex gap-2 text-xs text-black">
              💸 <span>Rs. {eventData.price} per person</span>
            </div>
          </section>

          {/* Organizer */}
          <section className="flex gap-10 self-center py-1.5 pr-3 pl-1 mt-5 w-full bg-white border-t border-b border-zinc-800 max-w-full px-4 justify-between">
            <div className="flex flex-1 gap-2.5 mt-1.5 text-black">
              <div className="w-8 h-8 rounded-full bg-zinc-300" />
              <div className="flex flex-col">
                <div className="text-xs">{eventData.organizer.name}</div>
                <div className="mt-2.5 text-xs">
                  active since {eventData.organizer.since}
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
                  <span>{eventData.organizer.rating}</span>⭐
                </div>
              </div>
            </div>
          </section>

          {/* Description */}
          <section
            className="self-center px-5 mt-5"
            aria-label="Event description"
          >
            <p className="text-xs tracking-tight text-black">
              {showFullDescription
                ? eventData.description
                : `${eventData.description.slice(0, 100)}...`}
            </p>
            <button
              className="mt-2 text-xs tracking-tight text-black"
              onClick={() => setShowFullDescription((prev) => !prev)}
            >
              {showFullDescription ? "Read Less" : "Read More"}
            </button>
            <div className="shrink-0 ml-5 h-px border border-black border-solid w-[49px]" />
          </section>

          {/* Attendees */}
          <section className="mt-10" aria-label="Attendees">
            <h3 className="ml-6 text-base tracking-tight text-black">Going</h3>
            <div className="px-4">
              {eventData.attendees.map((attendee, idx) => (
                <div
                  key={idx}
                  className="flex gap-2.5 self-center pr-16 mt-3 max-w-full bg-white w-[329px]"
                >
                  <img
                    src={attendee.profilePic}
                    alt={`${attendee.name}'s profile picture`}
                    className="w-auto max-w-12 aspect-square"
                  />
                  <div className="self-start">
                    <div className="text-sm leading-loose text-black">
                      {attendee.name}
                    </div>
                    <div className="text-xs leading-loose text-zinc-800">
                      Joined on {attendee.joinedDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
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

const EventFeedbackModal = ({ isOpen, onClose, onSubmit }) => {
  const [eventHappened, setEventHappened] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!isOpen) {
      // Reset internal state when modal closes
      setEventHappened(null);
      setRating(0);
      setFeedback("");
    }
  }, [isOpen]);

  const handleSubmit = () => {
    const response = {
      eventHappened,
      rating,
      feedback,
    };
    onSubmit(response);
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">
        <h1 className="text-lg italic font-semibold mb-4 text-center">
          Share you <span className="text-orange-400">Experiences</span>
        </h1>
        <h2 className="text-lg poppins-extralight font-semibold mb-4 text-center">
          Did the event happen?
        </h2>

        {!eventHappened && eventHappened !== false && (
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setEventHappened(true)}
              className="px-6 py-2 rounded-full border border-yellow-500 text-yellow-500 "
            >
              Yes
            </button>
            <button
              onClick={() => setEventHappened(false)}
              className="px-6 py-2  border-black border rounded-full text-black"
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

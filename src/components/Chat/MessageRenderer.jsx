import useEventDetails from "../../utils/hooks/useEventDetails"; // path as per your structure

const MessageRenderer = ({ message }) => {
  const { eventId } = useParams(); // If you're already inside a route with eventId
  const { userRole } = useEventDetails(eventId); // Use the role here

  if (message.type === "rsvp") {
    const { question, attendees, buttonText, buttonVisible } = message.content;

    return (
      <div className="space-y-2">
        <p className="text-sm">{question}</p>

        <div className="flex -space-x-2">
          {attendees.map((attendee, idx) => (
            <img
              key={idx}
              src={attendee.avatar}
              alt={attendee.name}
              className="w-6 h-6 rounded-full border-2 border-white"
            />
          ))}
        </div>

        {userRole === "seeker" && buttonVisible && (
          <button className="bg-[#F38E1C] text-white px-3 py-1 rounded-lg text-xs">
            {buttonText}
          </button>
        )}
      </div>
    );
  }

  // fallback for other types
  return typeof message.content === "string" ? (
    <p>{message.content}</p>
  ) : (
    <pre>{JSON.stringify(message.content, null, 2)}</pre>
  );
};

export default MessageRenderer;

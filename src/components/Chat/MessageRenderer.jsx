import React from "react";

const MessageRenderer = ({ message}) => {
  const { type, content } = message;
  console.log("Rendering message:", message);


  switch (type) {
    case "text":
      return <p>{content}</p>;

    case "rsvp":
      return (
        <div className="space-y-1">
          <p className="font-medium text-[#FFFFFF]">{content.question}</p>
          {content.attendees && (
            <div className="flex -space-x-2">
              {content.attendees.map((a, i) => (
                <img
                  key={i}
                  src={a.avatar}
                  className="w-6 h-6 rounded-full border-2 border-white"
                  title={a.name}
                />
              ))}
            </div>
          )}
          {content.buttonVisible && (
            <button className="mt-1 text-xs text-white bg-orange-500 px-3 py-1 rounded">
              {content.buttonText}
            </button>
          )}
        </div>
      );

    case "review":
      return (
        <div className="space-y-1">
          <p className="font-medium text-orange-500">{content.question}</p>
          <p className="text-sm text-gray-300">from {content.sender}</p>
          {content.buttonVisible && (
            <button className="w-[104px] h-[29px] border border-[#F38E1C]  text-[#F38E1C] rounded-3xl bg-transparents">
              {content.buttonText}
            </button>
          )}
        </div>
      );

    default:
      return <p>Unsupported message type</p>;
  }
};

export default MessageRenderer;

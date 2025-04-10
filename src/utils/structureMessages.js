import { getParticipantsData } from "./api";

export const sendRSVPMessage = (sendFn, userRole, eventId) => {
  const isSeeker = userRole !== "host";
  const data = getParticipantsData(eventId);
  const thinkingUsers = data.thinking.user || [];
  const attendees = thinkingUsers.map((user) => ({
    name: user.name,
    avatar: user.avatar,
  }));
  const message = {
    type: "rsvp",
    content: {
      question: "Have you made up your mind?",
      attendees,
      buttonText: "are you attending",
      buttonVisible: isSeeker,
    },
  };

  sendFn(JSON.stringify(message));
};

export const sendReviewMessage = (sendFn, isSeeker) => {
  const message = {
    type: "review",
    content: {
      question: "How was your experience?",
      buttonText: isSeeker ? "Leave a Review" : "Share Your Experience",
      buttonVisible: true,
    },
  };

  sendFn(JSON.stringify(message));
};

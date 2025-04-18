import { getParticipantsData } from "./api";

export const sendRSVPMessage = async (sendFn, eventId) => {
  const data = await getParticipantsData(eventId);
  const thinkingUsers = data?.thinking || [];

  const attendees = thinkingUsers.map((entry) => ({
    avatar: entry.user?.avatar || "unkonown",
    name: entry.user?.name || " ",
  }));

  const message = {
    type: "rsvp",
    content: {
      question: "Have you made up your mind?",
      attendees,
      buttonText: "are you attending",
    },
  };

  sendFn(JSON.stringify(message));
};

export const sendReviewMessage = (sendFn, userRole) => {
  const isSeeker = userRole !== "host";
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

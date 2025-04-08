// utils/dateFormatter.js

export const formatDate = (isoString) => {
  const date = new Date(isoString);

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short", // change to 'long' for full month name
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

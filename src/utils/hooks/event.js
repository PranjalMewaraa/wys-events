import { useState, useEffect } from "react";
import { fetchEventById, getEventsCreatedByUser } from "../api";
import { decodeToken } from "../helper";

const useEventDetails = (eventId) => {
  const [event, setEvent] = useState(null);
  const [eventsByUser, setEventsByUser] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [isEventOver, setIsEventOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = import.meta.env.VITE_AUTH_TOKEN;
  const userId = decodeToken(token)?._id;

  useEffect(() => {
    if (!eventId || !userId) return;

    const getEventDetails = async () => {
      setLoading(true);
      try {
        const [eventData, userEvents] = await Promise.all([
          fetchEventById(eventId),
          getEventsCreatedByUser(),
        ]);

        setEvent(eventData);
        setEventsByUser(userEvents);

        setUserRole(eventData.createdBy === userId ? "host" : "seeker");

        const currentDate = new Date();
        const eventEndDate = new Date(eventData.toDate);
        setIsEventOver(currentDate > eventEndDate);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getEventDetails();
  }, [eventId, userId]);

  return { event, eventsByUser, userRole, isEventOver, loading, error };
};

export default useEventDetails;

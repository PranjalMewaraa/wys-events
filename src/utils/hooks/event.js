import { useState, useEffect } from "react";
import { fetchEventById, fetchEvents, getEventsCreatedByUser } from "../api";
import { decodeToken } from "../helper";

const useEventDetails = (eventId) => {
  const [event, setEvent] = useState(null);
  const [eventsByUser, setEventsByUser] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [isEventOver, setIsEventOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("accessToken");
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
        const status = eventData.eventStatus;
        setIsEventOver(currentDate > eventEndDate || status === "completed");
      } catch (error) {
        console.error("Error fetching event details:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getEventDetails();
  }, [eventId, userId]);

  return {
    event,
    setEvent,
    eventsByUser,
    userRole,
    isEventOver,
    loading,
    error,
  };
};

export default useEventDetails;

export const useEvents = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const getEventsData = async () => {
      try {
        const eventsData = await fetchEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
    getEventsData();
  }, []);
  return { events };
};

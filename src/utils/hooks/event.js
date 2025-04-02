import { useState, useEffect } from "react";
import { fetchEventById } from "../api";
import { decodeToken } from "../helper";

const useEventDetails = (eventId) => {
  const [event, setEvent] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2VhNGQ3MmU2YWEyMmRlYzQ3NzJmMWMiLCJuYW1lIjoibWFpIGh1IGFkbWluIiwiZW1haWwiOiJhZG1pbnVkbWluQGdtYWlsLmNvbSIsImlhdCI6MTc0MzUxNTUwOSwiZXhwIjoxNzQzNjAxOTA5fQ.a5d035sOj6L3bgF-Qrvz7Hv32vL7Vj0qk_ePe81rTlY";

  const userId = decodeToken(token)?._id;

  useEffect(() => {
    if (!eventId || !userId) return;

    const getEventDetails = async () => {
      setLoading(true);
      try {
        const eventData = await fetchEventById(eventId);
        setEvent(eventData);

        // Determine if the user is the host or a seeker
        setUserRole(eventData.createdBy === userId ? "host" : "seeker");
      } catch (error) {
        console.error("Error fetching event details:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getEventDetails();
  }, [eventId, userId]);

  return { event, userRole, loading, error };
};

export default useEventDetails;

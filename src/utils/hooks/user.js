import { useEffect, useState } from "react";
import {
  getMatchedUsers,
  getCompatibility,
  fetchUserByIdForMatching,
} from "../api";
import axios from "axios";

const useMatchedUsers = () => {
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const response = await getMatchedUsers();
        const users = response.data || [];

        // Get compatibility scores for each user
        const usersWithScore = await Promise.all(
          users.map(async (user) => {
            try {
              const compatibility = await getCompatibility(user._id);
              return {
                ...user,
                matchPercentage: compatibility?.compatibilityScore || 0,
              };
            } catch (err) {
              console.error(
                `Error fetching compatibility for ${user._id}`,
                err
              );
              return {
                ...user,
                matchPercentage: 0,
              };
            }
          })
        );

        // Sort users by score (descending)
        const sorted = usersWithScore.sort(
          (a, b) => b.matchPercentage - a.matchPercentage
        );

        setMatchedUsers(sorted);
      } catch (err) {
        console.error("Error fetching matched users:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return { matchedUsers, loading, error };
};

export default useMatchedUsers;
export const useCompatibility = (id) => {
  const [compatibility, setCompatibility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchCompatibility = async () => {
      try {
        setLoading(true);
        const data = await getCompatibility(id);
        setCompatibility(data);
      } catch (err) {
        console.error("Error fetching compatibility:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompatibility();
  }, [id]);

  return { compatibility, loading, error };
};

export const useUserById = (id) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await fetchUserByIdForMatching(id);
        setUser(data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("Axios error:", err.response?.data || err.message);
        } else {
          console.error("Unexpected error:", err);
        }
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return { user, loading, error };
};

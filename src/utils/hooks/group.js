import { useEffect, useState } from "react";
import { fetchFriends, fetchGroups } from "../api";

export const useChatList = (activeTab, token) => {
  const [groups, setGroups] = useState([]);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [groupId, setGroupId] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (activeTab === "group") {
          const groupData = await fetchGroups(token);
          setGroupId(groupData._id);
          setGroups(groupData);
        } else {
          const peopleData = await fetchFriends(token);
          setPeople(peopleData);
        }
      } catch (err) {
        setError(err.message || "Error fetching chat list");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [activeTab, token]);

  return {
    groups,
    groupId,
    people,
    loading,
    error,
  };
};

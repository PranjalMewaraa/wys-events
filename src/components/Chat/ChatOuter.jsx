import React, { useState, useEffect } from "react";
import lens from "../../assets/images/lens.png";
import ChatList from "./ChatList";
import { useChatList } from "../../utils/hooks/group";
import Layout from "../../Layout/Layout";
import LayoutInnerMain from "../../Layout/LayoutInner";
import {
  
  useDirectChatRefresh,
} from "../../utils/hooks/DirectMessage";
import { acceptFriendRequest } from "../../utils/api";
import { apiGet } from "../../utils/call";
import { Link } from "react-router-dom";

const ChatOuter = () => {
  const [activeTab, setActiveTab] = useState("people");
  const [visibleCount, setVisibleCount] = useState(5);
  const { pendingRequests, refetchPendingRequests } = useDirectChatRefresh();

  const token = localStorage.getItem("accessToken");
  const { groups, people, loading, error, groupId } = useChatList(
    activeTab,
    token
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCount(3);
      else if (width < 1024) setVisibleCount(5);
      else setVisibleCount(8);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAccept = async (id) => {
    await acceptFriendRequest(id);
    await refetchPendingRequests(); // ← refresh the list after accepting
  };
  const [eventCreated, setEventCreated] = useState([]);
  const CallCreatedEvents = async () => {
    try {
      const res = await apiGet("/events/created");
      setEventCreated(res);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };
  useEffect(() => {
    CallCreatedEvents();
  }, []);
  return (
    <Layout>
      <LayoutInnerMain />
      <div className="w-full h-full">
        <div className="w-9/10 container m-auto mt-6 border border-transparent rounded-2xl bg-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
          <p className="text-base abeezee-regular leading-6 md:text-4xl py-2 px-5">
            Requests
          </p>
          <div className="flex gap-4 w-full p-4 overflow-x-auto">
            {eventCreated &&
              eventCreated.map((item, index) => {
                if (!item.participants || item.participants.length === 0)
                  return null;

                const filteredParticipants = item.participants.filter(
                  (p) =>
                    p.requestStatus === "requested" && p.rsvpStatus === "no"
                );

                if (filteredParticipants.length === 0) return null;

                return (
                  <Link
                    to={`/listing/myevent/detail/${item._id}`}
                    key={index}
                    className="min-w-[200px] p-4 bg-gray-100 shadow-sm flex-shrink-0 flex flex-col gap-2 rounded-lg"
                  >
                    <p className="font-semibold text-gray-800 truncate">
                      {item.name || "Untitled Event"}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {filteredParticipants.map((p, i) => (
                        <img
                          key={i}
                          src={p.user.avatar || "/default-avatar.png"}
                          alt="Participant"
                          className="h-10 w-10 rounded-full object-cover border border-gray-300"
                        />
                      ))}
                    </div>
                  </Link>
                );
              })}
          </div>

          {/* {Array.isArray(pendingRequests) && pendingRequests.length > 0 ? (
            <>
              <div className="flex flex-wrap gap-4 p-5">
                {pendingRequests.slice(0, visibleCount).map((req) => (
                  <div
                    key={req._id}
                    className="p-3 bg-white rounded-xl shadow-md text-center"
                  >
                    <img
                      src={req.senderId.avatar}
                      alt="User Avatar"
                      className="w-14 h-14 mx-auto rounded-full object-cover"
                    />
                    <p className="text-sm font-semibold mt-2">
                      {req.senderId.name}
                    </p>
                    <button
                      onClick={() => handleAccept(req._id)}
                      className="mt-2 px-4 py-1 text-sm bg-black text-white rounded-full"
                    >
                      Accept
                    </button>
                  </div>
                ))}
              </div>
              {pendingRequests.length > visibleCount && (
                <div className="text-center mb-4">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 5)}
                    className="text-blue-600 hover:underline"
                  >
                    See More
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-left text-gray-400 px-5 py-4">
              No pending requests.
            </p>
          )} */}
        </div>

        <div className="w-full mt-14">
          <div className="w-9/10 flex gap-10 items-center justify-evenly">
            <button
              className={`w-1/3 ml-10 text-center abeezee-regular text-base ${
                activeTab === "people" ? "border-b-2 border-black" : ""
              }`}
              onClick={() => setActiveTab("people")}
            >
              People
            </button>
            <button
              className={`w-1/3 abeezee-regular text-base text-center ${
                activeTab === "group" ? "border-b-2 border-black" : ""
              }`}
              onClick={() => setActiveTab("group")}
            >
              Groups
            </button>
          </div>
        </div>

        <div className="w-full  border border-transparent rounded-t-3xl bg-white drop-shadow-[0_-4px_6px_rgba(0,0,0,0.1)]">
          <div className="w-9/10 m-auto mt-3 flex items-center gap-2 border-2 border-gray-400 rounded-lg px-3 py-2 focus-within:ring-2">
            <span className="text-gray-400">
              <img src={lens} alt="Search Icon" />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent outline-none"
            />
          </div>

          <div className="h-full mb-40">
            {activeTab === "group" ? (
              groups.length > 0 ? (
                groups.map((group) => (
                  <ChatList
                    key={group._id}
                    image={group.eventId.image}
                    name={group.groupName}
                    groupId={group._id}
                    eventId={group.eventId._id}
                    activeTab="group"
                    token={token}
                  />
                ))
              ) : (
                <p className="text-center text-gray-400 mt-4">
                  No groups to chat in.
                </p>
              )
            ) : people.length > 0 ? (
              people.map((user) => (
                <ChatList
                  key={user._id}
                  image={user.avatar}
                  name={user.name}
                  userId={user._id}
                  activeTab="people"
                  token={token}
                />
              ))
            ) : (
              <p className="text-center text-gray-400 mt-4">
                No people to chat with.
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatOuter;

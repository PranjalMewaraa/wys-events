import React, { useEffect, useState } from "react";
import AdminLayout from "../Layout/AdminLayouts/AdminLayout";
import LayoutInnerAdmin from "../Layout/AdminLayouts/AdminInner";
import { FaSearch } from "react-icons/fa";
import { FiFlag } from "react-icons/fi";
import { FaLocationPin, FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { apiGet } from "../utils/call";
import { formatDate } from "../utils/formatDate";
import { BsCashStack } from "react-icons/bs";

const EventAdmin = () => {
  const [search, setSearch] = useState("");

  const [userslist, setUserlists] = useState([]);

  const [events, setEvents] = useState([]);

  const getProfile = async () => {
    const res = await apiGet(`/admin/users`);
    console.log(res.data);
    setUserlists(res.data);
  };

  const getEvent = async () => {
    const res = await apiGet("/admin/events");
    console.log(res);
    setEvents(res);
  };

  useEffect(() => {
    getProfile();
    getEvent();
  }, []);

  // Filter users based on name/location/gender match
  const filteredUsers = events?.filter((event) => {
    const value = search.toLowerCase();
    return (
      event?.name?.toLowerCase().includes(value) ||
      event?.description?.toLowerCase().includes(value) ||
      event?.location?.toLowerCase().includes(value)
    );
  });

  return (
    <AdminLayout>
      <LayoutInnerAdmin>
        <div className="p-4 w-full flex pb-28 flex-col gap-4">
          {/* Search bar */}
          <div className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-full px-4 py-2 shadow-sm transition focus-within:ring-2 focus-within:ring-slate-500">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, location or info..."
              className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>

          <div className="w-full p-4 flex flex-col gap-4">
            <p className="w-full text-2xl poppins-bold">Event Management</p>
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-4 gap-4">
              {filteredUsers?.length > 0 ? (
                filteredUsers
                  .reverse()
                  ?.map((item) => <EventCard item={item} />)
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No Events found.
                </p>
              )}
            </div>
          </div>
        </div>
      </LayoutInnerAdmin>
    </AdminLayout>
  );
};

export default EventAdmin;

const EventCard = ({ item }) => {
  return (
    <>
      <Link
        to={`/admin/event/${item._id}`}
        className="mt-2 bg-white shadow-lg max-w-sm w-full rounded-lg overflow-hidden"
      >
        <div className="w-full h-[160px] relative">
          <img
            src={item.images || "/event/hikinh.webp"} // Replace with actual hosted image
            alt="Himalayas Trek"
            className="w-full h-full object-cover"
          />
          <p className="z-20 right-4 text-xs top-4 p-1 poppins-italic text-white rounded-full px-4 bg-green-600 absolute">
            {item.eventStatus}
          </p>
        </div>
        <div className="p-3">
          <div className="w-full flex justify-between items-center">
            <h3 className="font-semibold max-w-60 text-lg">{item.name}</h3>
            <p className="flex gap-2  items-center">
              <BsCashStack /> Rs. {item.cost} /<FaUser size={14} />
            </p>
          </div>
          <p className="text-sm text-gray-600 flex items-center mt-1">
            📅 {formatDate(item.fromDate)}
          </p>
          <p className="text-sm text-gray-600 flex items-center mt-1">
            📍 {item.location}
          </p>
          <p className="text-sm text-gray-600 flex items-center mt-1">
            👥 Slots left : {item.availableSlots} / {item.totalSlots}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="bg-green-500 text-white px-2 py-1 text-xs rounded-md">
              ★ {item.rating}
            </span>
            <span
              className={`text-xs p-1 text-white rounded  ${
                item.status === "pending"
                  ? "bg-red-500"
                  : item.status === "rejected"
                  ? "bg-red-500"
                  : "bg-green-600"
              }`}
            >
              {item.status === "pending"
                ? "Need action"
                : item.status === "rejected"
                ? "Rejected"
                : "Verified"}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

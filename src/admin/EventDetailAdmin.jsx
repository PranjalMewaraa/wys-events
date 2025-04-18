import React, { useEffect, useState } from "react";
import { MdDateRange, MdLocationOn } from "react-icons/md";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { FiTarget } from "react-icons/fi";
import { SiTicktick } from "react-icons/si";
import { FaRegUserCircle } from "react-icons/fa";
import AdminLayout from "../Layout/AdminLayouts/AdminLayout";
import LayoutInnerMain from "../Layout/LayoutInner";
import { apiGet, apiPut } from "../utils/call";
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { BsCashStack } from "react-icons/bs";

const EventDetailAdmin = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [showActionModal, setShowActionModal] = useState(false);
  const [showRejectReasonModal, setShowRejectReasonModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const getEventbyId = async () => {
    const res = await apiGet(`/admin/events/${id}`);
    setEvent(res);
  };

  useEffect(() => {
    getEventbyId();
  }, []);

  const handleItem = () => {
    if (event.status === "pending") {
      setShowActionModal(true);
    }
  };

  const approveEvent = async () => {
    try {
      await apiPut(`/admin/events/${id}/approve`);
      setShowActionModal(false);
      getEventbyId();
    } catch (error) {
      console.error("Approval failed", error);
    }
  };

  const rejectEvent = async () => {
    if (!rejectReason.trim()) {
      alert("Please provide a reason for rejection.");
      return;
    }
    try {
      await apiPut(`/admin/events/${id}/reject`, {
        rejectionReason: rejectReason,
      });
      setShowRejectReasonModal(false);
      setRejectReason("");
      getEventbyId();
    } catch (error) {
      console.error("Rejection failed", error);
    }
  };

  const goingParticipants =
    event.participants?.filter((p) => p.rsvpStatus === "yes") || [];
  const thinkingParticipants =
    event.participants?.filter((p) => p.rsvpStatus !== "yes") || [];

  return (
    <AdminLayout>
      <LayoutInnerMain>
        <div className="flex overflow-hidden pb-28 p-4 flex-col h-fit rounded-xl max-w-7xl bg-white">
          <img
            src={event.image || "/event/hikinh.webp"}
            alt="hiking"
            className="h-1/2 max-h-72 rounded-xl object-cover"
          />
          <div className="w-full flex-col gap-4 py-4">
            <div className="flex text-2xl mb-4 items-center justify-between w-full">
              <p>{event.name}</p>
              <button
                className={`p-4 py-2 md:py-4 md:px-6 text-sm md:text-base text-yellow-500 border border-yellow-500 rounded-full ${
                  event.status === "pending"
                    ? "bg-transparent"
                    : event.status === "rejected"
                    ? "bg-red-500"
                    : "bg-green-600"
                }`}
                onClick={handleItem}
              >
                {event.status === "pending"
                  ? "Need action"
                  : event.status === "rejected"
                  ? "Rejected"
                  : "Verified"}
              </button>
            </div>

            <div className="flex flex-col gap-4 py-4">
              <p className="flex text-base gap-2 items-center">
                <MdDateRange size={18} />
                {formatDate(event.fromDate)}
              </p>
              <p className="flex text-base gap-2 items-center">
                <MdLocationOn size={18} />
                {event.location}
              </p>
              <p className="flex text-sm md:max-w-1/2 gap-2 leading-4 text-gray-500 items-center">
                Description: {event.description}
              </p>
              <div className="flex justify-between gap-4 flex-wrap">
                <p className="flex text-base gap-2 items-center">
                  <FiTarget size={18} />
                  Total Slots: {event.totalSlots} |{" "}
                  <span className="text-green-600">
                    {event.availableSlots} slots available
                  </span>
                </p>
                {event.paymentType !== "fee" ? (
                  <p>Go {event.paymentType}</p>
                ) : (
                  <p className="flex gap-2  items-center">
                    {" "}
                    <BsCashStack />
                    Rs. {event.cost} per person
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 border-t border-b flex justify-between py-2">
                <div className="flex gap-4 items-center">
                  <FaRegUserCircle size={28} />
                  <div>
                    <p>{event.createdBy?.name || "N/A"}</p>
                    <p className="text-sm">{event.createdBy?.email || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Going Participants */}
            <div className="mt-6">
              <p className="flex gap-2 items-center text-lg font-semibold">
                ✅ Going <SiTicktick color="orange" />
              </p>
              <div className="flex flex-col w-full gap-2 mt-2">
                {goingParticipants.length > 0 ? (
                  goingParticipants.map((item) => (
                    <div
                      key={item.user._id}
                      className="w-full flex items-center gap-4"
                    >
                      <img
                        src={item.user.avatar}
                        alt={item.user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium">{item.user.name}</p>
                        <p className="text-sm text-gray-600">
                          Location: {item.user.currentLocation || "N/A"}
                        </p>
                        <p className="text-sm text-gray-600">
                          Request Status: {item.requestStatus || "N/A"}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No one confirmed yet.</p>
                )}
              </div>
            </div>

            {/* Thinking Participants */}
            <div className="mt-6">
              <p className="flex gap-2 items-center text-lg font-semibold">
                🤔 Thinking About It
              </p>
              <div className="flex flex-col w-full gap-2 mt-2">
                {thinkingParticipants.length > 0 ? (
                  thinkingParticipants.map((item) => (
                    <div
                      key={item.user._id}
                      className="w-full flex items-center gap-4"
                    >
                      <img
                        src={item.user.avatar}
                        alt={item.user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium">{item.user.name}</p>
                        <p className="text-sm text-gray-600">
                          Location: {item.user.currentLocation || "N/A"}
                        </p>
                        <p className="text-sm text-gray-600">
                          Request Status: {item.requestStatus || "N/A"}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    No unsure participants yet.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Take Action Modal */}
          {showActionModal && (
            <div className="fixed inset-0 z-50 backdrop-blur-md flex justify-center items-center">
              <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl border border-white/30">
                <h2 className="text-xl font-semibold mb-4 text-center">
                  Take Action
                </h2>
                <div className="flex justify-around">
                  <button
                    className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600"
                    onClick={approveEvent}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600"
                    onClick={() => {
                      setShowActionModal(false);
                      setShowRejectReasonModal(true);
                    }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Reject Reason Modal */}
          {showRejectReasonModal && (
            <div className="fixed inset-0 z-50 backdrop-blur-md flex justify-center items-center">
              <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl border border-white/30">
                <h2 className="text-xl font-semibold mb-4 text-center">
                  Reason for Rejection
                </h2>
                <textarea
                  rows={5}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Enter reason here..."
                  className="w-full bg-gray-100 p-3 rounded-md outline-none resize-none"
                />
                <button
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-full hover:bg-red-600"
                  onClick={rejectEvent}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </LayoutInnerMain>
    </AdminLayout>
  );
};

export default EventDetailAdmin;

import * as React from "react";
import Layout from "../../Layout/Layout";
import LayoutInnerMain from "../../Layout/LayoutInner";
import { Link } from "react-router-dom";
import { apiGet } from "../../utils/call";
import { formatDate, formatDatewithoutTime } from "../../utils/formatDate";

const EventsView = () => {
  const [activeTab, setActiveTab] = React.useState("upcoming");
  const [myevents, setEvents] = React.useState([]);
  const [upevents, setUpEvents] = React.useState([]);
  const CallCreatedEvents = async () => {
    try {
      const res = await apiGet("/events/created");
      setEvents(res);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };
  const CallUpcomingEvents = async () => {
    try {
      const res = await apiGet("/events/upcoming");
      setUpEvents(res);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  React.useEffect(() => {
    CallUpcomingEvents();
    CallCreatedEvents();
  }, []);

  return (
    <Layout>
      <LayoutInnerMain>
        <div
          className="relative mx-auto mb-40 w-full min-h-screen  bg-white px-5 py-5"
          role="main"
        >
          {/* Tabs */}
          <nav className="mb-6">
            <div className="flex bg-zinc-200 p-1 rounded-full shadow-inner">
              {["upcoming", "yourEvents"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-1/2 px-6 py-2 text-sm rounded-full transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-zinc-800 text-white shadow"
                      : "text-zinc-800 hover:bg-zinc-100"
                  }`}
                >
                  {tab === "upcoming" ? "Upcoming" : "Your Events"}
                </button>
              ))}
            </div>
          </nav>

          {/* Tab Content */}
          {activeTab === "upcoming" && (
            <section>
              <h2 className="text-xs text-zinc-600 mb-3">Upcoming</h2>
              <div className="flex w-full md:flex-row flex-wrap flex-col gap-4">
                {upevents.length === 0 ? (
                  <p className="text-center text-zinc-500 py-8">
                    No upcoming events right now.
                  </p>
                ) : (
                  upevents.map((item) => (
                    <UpcomingEventCard key={item._id} item={item} />
                  ))
                )}
              </div>
            </section>
          )}

          {activeTab === "yourEvents" && (
            <section className="w-full">
              <h2 className="text-xs text-zinc-600 mb-3">Your Events</h2>
              <div className="flex w-full md:flex-row flex-wrap flex-col gap-4">
                {myevents.length === 0 ? (
                  <p className="text-center text-zinc-500 py-8">
                    No events created yet.
                  </p>
                ) : (
                  myevents.map((item) => (
                    <MyEventCard key={item._id} item={item} />
                  ))
                )}
              </div>

              {/* Floating Action Button */}
              <Link
                to="/listing/input"
                className="fixed bottom-24 md:bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-zinc-800 text-white text-sm px-6 py-3 rounded-full shadow-lg hover:bg-zinc-700 transition-all duration-200"
              >
                + Create Experience
              </Link>
            </section>
          )}
        </div>
      </LayoutInnerMain>
    </Layout>
  );
};

function UpcomingEventCard({ item }) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const companions = [
    "https://randomuser.me/api/portraits/women/1.jpg",
    "https://randomuser.me/api/portraits/men/2.jpg",
    "https://randomuser.me/api/portraits/women/3.jpg",
    "https://randomuser.me/api/portraits/men/4.jpg",
  ];

  return (
    <article
      onClick={() => setIsExpanded(!isExpanded)}
      className="cursor-pointer transition-all duration-300 bg-white shadow-md md:max-w-sm hover:shadow-lg rounded-2xl overflow-hidden"
    >
      <div className="h-[180px] overflow-hidden">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b6dbce15700a6ccf0e14fe621cd63df7b6a845d7"
          alt="Event"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-zinc-800">
          {item.name}
        </h3>
        <div className="text-sm text-zinc-600 space-y-1">
          <div className="flex items-center gap-2">
            <i className="ti ti-calendar" />
            <span>{formatDatewithoutTime(item.fromDate)}</span>
            <span className="text-xs text-zinc-400">•</span>
            <span>{item.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="ti ti-map-pin" />
            <span>{item.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="ti ti-users" />
            <span>{item.participants.length} Seekers</span>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4">
            <div className="flex gap-3 flex-wrap mb-4">
              {item.participants.map((img, idx) => (
                <img
                  key={idx}
                  src={img?.user?.avatar}
                  alt={`Companion ${img?.user?.name}`}
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
              ))}
            </div>
            <div className="flex gap-4">
              <Link
                to={`/listing/upcoming/detail/${item._id}`}
                className="px-4 py-2 bg-black text-white rounded-xl text-sm"
              >
                View
              </Link>
              <button className="px-4 py-2 bg-black text-white rounded-xl text-sm">
                Show Chat
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

function MyEventCard({ item }) {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Link
      to={`/listing/myevent/detail/${item._id}`}
      className="transition-all duration-300 bg-white max-w-sm w-full shadow-md hover:shadow-lg rounded-2xl overflow-hidden"
    >
      <div className="h-[180px] relative overflow-hidden">
        <p className="absolute right-4 text-sm italic top-4 bg-white px-4 py-1 rounded">
          {item.status === "pending"
            ? "Pending Approval"
            : item.status === "approved"
            ? "Listed"
            : "Rejected"}
        </p>
        <img
          src={
            item.image ||
            "https://cdn.builder.io/api/v1/image/assets/TEMP/b6dbce15700a6ccf0e14fe621cd63df7b6a845d7"
          }
          alt={item.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-zinc-800">
          {item?.name}
        </h3>
        <div className="text-sm text-zinc-600 space-y-1">
          <div className="flex items-center gap-2">
            <i className="ti ti-calendar" />
            <span>{formatDate(item?.fromDate)}</span>
            <span className="text-xs text-zinc-400">•</span>
            <span>{item?.time || "TBD"}</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="ti ti-map-pin" />
            <span>{item.location || "Unknown"}</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="ti ti-users" />
            <span className="text-red-400 font-medium">
              Slots Left: {item.availableSlots ?? 0} / {item.totalSlots ?? 0}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default EventsView;

import * as React from "react";
import Layout from "../../Layout/Layout";
import LayoutInnerMain from "../../Layout/LayoutInner";
import { Link, Links } from "react-router-dom";
const EventsView = () => {
  const [activeTab, setActiveTab] = React.useState("upcoming");

  return (
    <Layout>
      <LayoutInnerMain>
        <link
          href="https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&family=Bakbak+One&display=swap"
          rel="stylesheet"
        />
        <div
          className="relative mx-auto my-0 w-full h-screen bg-white max-w-[390px] max-sm:w-full overflow-hidden"
          role="main"
        >
          {/* Tabs */}
          <nav
            className="px-12 py-0 mt-5 max-sm:px-5 max-sm:py-0"
            role="navigation"
          >
            <div className="flex p-2 rounded-3xl bg-zinc-800">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-8 py-3 text-xs w-1/2 rounded-2xl focus:outline-none ${
                  activeTab === "upcoming"
                    ? "bg-white text-zinc-800"
                    : "text-white"
                }`}
                aria-current={activeTab === "upcoming" ? "page" : undefined}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab("yourEvents")}
                className={`px-8 py-3 text-xs w-1/2 rounded-2xl focus:outline-none ${
                  activeTab === "yourEvents"
                    ? "bg-white text-zinc-800"
                    : "text-white"
                }`}
                aria-current={activeTab === "yourEvents" ? "page" : undefined}
              >
                Your Events
              </button>
            </div>
          </nav>

          {/* Tab Content */}
          {activeTab === "upcoming" && (
            <section aria-labelledby="upcoming-section">
              <h2
                id="upcoming-section"
                className="px-16 py-5 text-xs text-black"
              >
                Upcoming
              </h2>
              <UpcomingEventCard />
            </section>
          )}

          {activeTab === "yourEvents" && (
            <section
              aria-labelledby="your-events-section"
              className="relative h-full pb-20"
            >
              <h2
                id="your-events-section"
                className="px-16 py-5 text-xs text-black"
              >
                Your Events
              </h2>
              <MyEventCard />

              {/* FAB Button */}
              <Link
                to="/listing/input"
                className="fixed bottom-28 left-28 z-50 bg-zinc-800 text-white text-sm px-5 py-3 rounded-xl shadow-md hover:bg-zinc-700 transition-all"
              >
                Create an Experience
              </Link>
            </section>
          )}

          {/* Previous Events */}
          <section aria-labelledby="previous-section">
            <h2 id="previous-section" className="px-16 py-5 text-xs text-black">
              Previous Events
            </h2>
          </section>
        </div>
      </LayoutInnerMain>
    </Layout>
  );
};

function UpcomingEventCard() {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const companions = [
    "https://randomuser.me/api/portraits/women/1.jpg",
    "https://randomuser.me/api/portraits/men/2.jpg",
    "https://randomuser.me/api/portraits/women/3.jpg",
    "https://randomuser.me/api/portraits/men/4.jpg",
    "https://randomuser.me/api/portraits/men/5.jpg",
    "https://randomuser.me/api/portraits/women/6.jpg",
  ];

  return (
    <article
      onClick={() => setIsExpanded(!isExpanded)}
      className="cursor-pointer overflow-hidden mx-16 my-0 bg-white rounded-2xl shadow-sm max-sm:mx-5 max-sm:my-0 transition-all duration-300"
    >
      <div className="overflow-hidden w-full h-[159px]">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b6dbce15700a6ccf0e14fe621cd63df7b6a845d7"
          alt="Mountain landscape with hiker"
          className="object-cover size-full"
        />
      </div>
      <div className="px-4 py-5">
        <h3 className="mb-3.5 text-xl">Himalayas Trek</h3>
        <div className="flex flex-col gap-3 text-xs">
          <div className="flex gap-2 items-center">
            <i className="ti ti-calendar" aria-hidden="true" />
            <span>26 Jun 2025</span>
            <div
              className="w-0.5 h-0.5 rounded-full bg-zinc-800"
              aria-hidden="true"
            />
            <span>8:00 AM</span>
          </div>
          <div className="flex gap-2 items-center">
            <i className="ti ti-map-pin" aria-hidden="true" />
            <span>Praygraj, Uttarakhand</span>
          </div>
          <div className="flex gap-2 items-center">
            <i className="ti ti-users" aria-hidden="true" />
            <span>6 Seekers</span>
          </div>
        </div>

        {/* Expanded Section */}
        {isExpanded && (
          <div className="mt-4">
            <div className="flex gap-3 flex-wrap mb-4">
              {companions.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Companion ${idx + 1}`}
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
              ))}
            </div>
            <div className="flex gap-4">
              <Link
                to={"/listing/upcoming/detail"}
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
function MyEventCard() {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const companions = [
    "https://randomuser.me/api/portraits/women/1.jpg",
    "https://randomuser.me/api/portraits/men/2.jpg",
    "https://randomuser.me/api/portraits/women/3.jpg",
    "https://randomuser.me/api/portraits/men/4.jpg",
    "https://randomuser.me/api/portraits/men/5.jpg",
    "https://randomuser.me/api/portraits/women/6.jpg",
  ];

  return (
    <article
      onClick={() => setIsExpanded(!isExpanded)}
      className="cursor-pointer overflow-hidden mx-16 my-0 bg-white rounded-2xl shadow-sm max-sm:mx-5 max-sm:my-0 transition-all duration-300"
    >
      <div className="overflow-hidden w-full h-[159px]">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b6dbce15700a6ccf0e14fe621cd63df7b6a845d7"
          alt="Mountain landscape with hiker"
          className="object-cover size-full"
        />
      </div>
      <div className="px-4 py-5">
        <h3 className="mb-3.5 text-xl">Himalayas Trek</h3>
        <div className="flex flex-col gap-3 text-xs">
          <div className="flex gap-2 items-center">
            <i className="ti ti-calendar" aria-hidden="true" />
            <span>26 Jun 2025</span>
            <div
              className="w-0.5 h-0.5 rounded-full bg-zinc-800"
              aria-hidden="true"
            />
            <span>8:00 AM</span>
          </div>
          <div className="flex gap-2 items-center">
            <i className="ti ti-map-pin" aria-hidden="true" />
            <span>Praygraj, Uttarakhand</span>
          </div>
          <div className="flex gap-2 items-center">
            <i className="ti ti-users" aria-hidden="true" />
            <span className="text-red-300">Slots Left : 2</span>
          </div>
        </div>
      </div>
    </article>
  );
}
export default EventsView;

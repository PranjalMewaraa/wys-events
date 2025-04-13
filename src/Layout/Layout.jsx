import React from "react";
import { IoDocumentsOutline } from "react-icons/io5";
import { MdChatBubbleOutline, MdEventNote, MdPeopleAlt } from "react-icons/md";
import { RiHome9Line } from "react-icons/ri";
import { useLocation, Link } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { id: "home", icon: <RiHome9Line size={28} />, to: "/" },
    { id: "events", icon: <MdEventNote size={28} />, to: "/events" },
    { id: "people", icon: <MdPeopleAlt size={28} />, to: "/people" },
    { id: "docs", icon: <IoDocumentsOutline size={28} />, to: "/listing" },
    { id: "chat", icon: <MdChatBubbleOutline size={28} />, to: "/chat" },
  ];

  // Always determine activeTab based on current path
  const activeTab = navItems.find((item) =>
    item.to === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(item.to)
  )?.id;

  return (
    <div className="w-full flex items-center flex-col-reverse md:flex-row h-screen">
      {/* Navigation */}
      <nav
        className="flex max-h-16 md:max-h-full absolute bottom-4 w-[90%] md:static px-8 md:flex-col justify-between md:justify-start md:gap-6 items-center md:items-stretch
                 md:w-28 bg-[#333333] rounded-xl md:rounded-none h-16 md:h-full z-50 py-2 md:py-8"
      >
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.to}
            className="md:w-full flex justify-center items-center"
          >
            {React.cloneElement(item.icon, {
              color: activeTab === item.id ? "orange" : "gray",
            })}
          </Link>
        ))}
      </nav>

      {/* Main Content */}
      <div className="w-full h-full md:mb-0 md:flex-1 overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default Layout;

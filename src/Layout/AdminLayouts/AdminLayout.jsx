import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoDocumentsOutline } from "react-icons/io5";
import { MdChatBubbleOutline, MdEventNote, MdPeopleAlt } from "react-icons/md";
import { RiHome9Line } from "react-icons/ri";

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("home");

  const navItems = [
    { id: "home", icon: <RiHome9Line size={28} />, to: "/admin" },
    { id: "events", icon: <MdEventNote size={28} />, to: "/admin/event" },
    { id: "people", icon: <MdPeopleAlt size={28} />, to: "/admin/people" },
  ];

  useEffect(() => {
    const stored = localStorage.getItem("activeTab");
    if (stored) setActiveTab(stored);
  }, []);

  useEffect(() => {
    const matchedItem = navItems.find((item) =>
      location.pathname.startsWith(item.to)
    );
    if (matchedItem && matchedItem.id !== activeTab) {
      setActiveTab(matchedItem.id);
      localStorage.setItem("activeTab", matchedItem.id);
    }
  }, [location.pathname]);

  const handleTabClick = (id) => {
    setActiveTab(id);
    localStorage.setItem("activeTab", id);
  };

  return (
    <div className="w-full flex items-center flex-col-reverse md:flex-row h-screen">
      <nav
        id="nav"
        className="flex z-50 max-h-16 md:max-h-full absolute bottom-4 w-[90%] md:static px-8 md:flex-col justify-between md:justify-start md:gap-6 items-center md:items-stretch
                 md:w-28 bg-[#333333] rounded-xl md:rounded-none h-16 md:h-full  py-2 md:py-8"
      >
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.to}
            onClick={() => handleTabClick(item.id)}
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

export default AdminLayout;

import React from "react";
import {
  IoDocumentAttachOutline,
  IoDocumentOutline,
  IoDocumentsOutline,
} from "react-icons/io5";
import { MdChatBubbleOutline, MdEventNote, MdPeopleAlt } from "react-icons/md";
import { RiHome9Line } from "react-icons/ri";

const Layout = ({ children }) => {
  return (
    <div className="w-full flex items-center flex-col-reverse md:flex-row h-screen">
      {/* Bottom Nav on Mobile, Side Nav on Desktop */}
      <nav
        id="nav"
        className="flex max-h-16 md:max-h-full absolute bottom-4 w-[90%] md:static px-8 md:flex-col justify-between md:justify-start md:gap-6 items-center md:items-stretch
                 md:w-28 bg-[#333333] rounded-xl md:rounded-none h-16 md:h-full z-50 py-2 md:py-8"
      >
        <RiHome9Line size={28} color="orange" className="md:w-full" />
        <MdEventNote size={28} color="gray" className="md:w-full" />
        <MdPeopleAlt size={28} color="gray" className="md:w-full" />
        <IoDocumentsOutline size={28} color="gray" className="md:w-full" />
        <MdChatBubbleOutline size={28} color="gray" className="md:w-full" />
      </nav>

      {/* Main Content */}
      <div className="w-full h-full  md:mb-0 md:flex-1 overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default Layout;

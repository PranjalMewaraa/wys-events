import React from "react";
import { FaUser } from "react-icons/fa6";

const LayoutInnerMain = ({ children }) => {
  return (
    <div className="w-full h-fit  flex flex-col">
      <div className="w-full bg-white h-fit py-4 px-4 mb-4 flex items-center justify-between">
        <p className="poppins-black text-4xl">WYS</p>
        <FaUser size={24} />
      </div>
      <div className="h-fit w-full overflow-y-scroll">{children}</div>
    </div>
  );
};

export default LayoutInnerMain;

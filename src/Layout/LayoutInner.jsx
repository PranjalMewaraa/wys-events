import React from "react";
import { FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

const LayoutInnerMain = ({ children }) => {
  return (
    <div className="w-full h-fit  flex flex-col">
      <div className="w-full bg-white h-fit py-4 px-4 mb-4 flex items-center justify-between z-10">
        <p className="poppins-black text-4xl">WYS</p>
        <Link to="/profile">
  <FaUser size={24} />
</Link>


      </div>
      <div className="h-full flex-1 w-full flex overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default LayoutInnerMain;

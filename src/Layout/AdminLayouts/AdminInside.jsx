import React from "react";
import { FaUser } from "react-icons/fa6";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const LayoutInnerAdminInside = ({ children, name }) => {
  const nav = useNavigate();
  return (
    <div className="w-full h-fit  flex flex-col">
      <div className="w-full bg-white h-fit py-4 px-4 mb-4 flex items-center justify-between">
        <IoArrowBackOutline size={24} onClick={() => nav(-1)} />
        <p className="poppins-semibold text-2xl">{name}</p>
        <div></div>
      </div>
      <div className="h-full flex-1 w-full flex overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default LayoutInnerAdminInside;

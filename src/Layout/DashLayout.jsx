import React from "react";
import { FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

const DashLayout = ({ children }) => {
  return (
    <div className="w-full h-fit min-h-screen  flex flex-col">
      <div className="w-full bg-white h-fit py-4 px-4 mb-4 flex items-center justify-between">
        <p className="poppins-black text-4xl">WYS</p>
        <Link to='/profile'>
               <FaUser size={24} />
               </Link>
 
      </div>
      <div
        className="h-full flex-1 w-full flex overflow-y-scroll"
        style={{
          backgroundImage: "url('/home.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default DashLayout;

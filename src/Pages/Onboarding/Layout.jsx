import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <div className="max-w-lg w-full flex items-center min-h-screen flex-col h-full">
        <p className="poppins-black text-4xl">WYS</p>
        {children}
      </div>
    </div>
  );
};

export default Layout;

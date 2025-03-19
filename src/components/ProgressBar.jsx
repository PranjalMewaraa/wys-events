import React from "react";

const ProgressBar = ({ width = 10 }) => {
  return (
    <div className="w-full bg-gray-100 rounded-full overflow-hidden p-0.5 max-w-2/3 h-fit">
      <div className={`w-[${width}%] h-2 rounded-full bg-amber-500`}></div>
    </div>
  );
};

export default ProgressBar;

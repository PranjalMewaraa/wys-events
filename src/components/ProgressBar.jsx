import React from "react";

const ProgressBar = ({ width = 0.1 }) => {
  const percentage = (width / 8) * 100;
  console.log(percentage);

  return (
    <div className="w-full bg-gray-100 rounded-full overflow-hidden p-0.5 h-fit max-w-[66%]">
      <div
        className="h-2 rounded-full bg-amber-500"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;

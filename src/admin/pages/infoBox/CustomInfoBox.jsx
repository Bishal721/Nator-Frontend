import React from "react";

const CustomInfoBox = ({ bgColor, title, count, icon }) => {
  return (
    <div
      className={`w-full h-32 max-w-full md:max-w-[17rem] mr-4 mb-4 flex justify-start items-center align-middle flex-wrap text-[#fff] translate-y-[0] [transition:all_0.3s] pl-4 ${bgColor} hover:cursor-pointer hover:-translate-y-[8px] `}
    >
      <span className="px-8 py-[0] text-[#fff]">{icon}</span>
      <span className="text-white">
        <p>{title}</p>
        <h4>{count}</h4>
      </span>
    </div>
  );
};

export default CustomInfoBox;

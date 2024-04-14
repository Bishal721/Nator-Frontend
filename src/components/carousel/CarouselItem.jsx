import React from "react";
import { Link } from "react-router-dom";

const CarouselItem = ({ name, url, id, price }) => {
  return (
    <div className="w-[20rem] h-[25rem] overflow-hidden shadow-md ">
      {/* <Link to={`/package-details/${id}`}> */}
        <img
          src={url}
          className="h-[70%] w-[90%] object-cover p-2"
          alt="Package Image"
        />
      {/* </Link> */}
      <div className=" ml-2 my-3 capitalize">
        <p className="text-lg font-medium">{name}</p>
        <p className="text-sm font-normal">$&nbsp;{price}/per person</p>
      </div>
      <div className="ml-[1px] mb-4 rounded capitalize flex justify-center items-center w-[90%] text-white  bg-orange-400 cursor-pointer  hover:bg-orange-500">
        <Link to={`/package-details/${id}`}>
          <button className="w-full px-4 h-10 ">
            {" "}
            View Package
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CarouselItem;

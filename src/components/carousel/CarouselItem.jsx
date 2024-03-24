import React from "react";
import { Link } from "react-router-dom";

const CarouselItem = ({ name, url, id }) => {
  return (
    <div className="w-[20rem] h-auto rounded   bg-gray-100 text-center overflow-hidden shadow-[0_4px_8p_0_rgba(0,0,0,0.2)] ">
      <Link to={`/package-details/${id}`}>
        <img
          src={url}
          className="h-[70%] w-[90%] cursor-pointer object-cover mr-1 rounded-3xl mt-4"
          alt="Package Image"
        />
        <div className="flex justify-start   items-center p-4 ml-2  mb-3">
          <p className="text-xl font-semibold">{name}</p>
        </div>
      </Link>
    </div>
  );
};

export default CarouselItem;

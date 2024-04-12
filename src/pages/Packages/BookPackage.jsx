import React from "react";
import { RiCloseLine } from "react-icons/ri";

const BookPackage = ({ price, rating }) => {
  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setPackages({ ...packages, [name]: value });
  };
  return (
    <div className="sticky top-4">
      <div className="flex items-center justify-between my-8">
        <div className="text-lg">
          ${price} <span className="text-gray-500">/per person </span>
        </div>
        <div className="text-lg">{rating}</div>
      </div>
      <div className="border border-solid border-gray-300 p-2 ">
        <h2 className="text-xl mb-2">Information</h2>
        <form className="pt-2">
          <div className="border border-solid border-gray-300 my-4">
            <input
              type="text"
              placeholder="Full Name"
              required
              onChange={HandleInputChange}
              className="w-full p-2 rounded-lg  text-base  border-b border-b-gray-400 mb-2 focus:outline-none "
            />
            <input
              type="number"
              placeholder="Phone Number"
              required
              className="w-full p-2 rounded-lg  text-base  border-b border-b-gray-400 mb-2 focus:outline-none "
              onChange={HandleInputChange}
            />
            <div className="flex items-center gap-3">
              <input
                type="date"
                placeholder="date"
                required
                onChange={HandleInputChange}
                className="w-full p-2 rounded-lg  text-base  border-b border-b-gray-400 mb-2 focus:outline-none "
              />
              <input
                type="number"
                placeholder="Guest"
                required
                onChange={HandleInputChange}
                className="w-full p-2 rounded-lg  text-base  border-b border-b-gray-400 mb-2 focus:outline-none "
              />
            </div>
          </div>
          <div className="mt-2 border border-solid border-gray-300">
            <div className="border-0 px-2 flex justify-between mb-2 ">
              <h5 className="flex items-center gap-1">
                ${price} <RiCloseLine /> 1 person
              </h5>
              <span>{price}</span>
            </div>
            <div className="border-0 px-2 flex justify-between mb-2 font-bold">
              <h5 className="flex items-center gap-1">Total</h5>
              <span>$ 1000</span>
            </div>
          </div>
          <div className="mt-3">
            <button
              type="submit"
              className="w-full bg-blue-400 rounded-3xl p-2 text-white font-semibold hover:bg-blue-300 "
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookPackage;

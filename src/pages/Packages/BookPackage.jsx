import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createBooking } from "../../redux/features/packages/packageSlice";

const initialState = {
  phone: "",
  guests: "",
  date: "",
};
const BookPackage = ({ price, rating }) => {
  const [bookingData, setBookingData] = useState(initialState);
  const { id } = useParams();
  const dispatch = useDispatch();
  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };
  const { phone, guests, date } = bookingData;

  const bookpack = async (e) => {
    e.preventDefault();
    if (!phone || !guests || !date || !id) {
      return toast.error("All Fields are required");
    }
    const formData = {
      phone,
      guests,
      date,
      packageId: id,
    };
    console.log(formData);
    dispatch(createBooking(formData));
  };
  return (
    <div className="sticky top-24">
      <div className="flex items-center justify-between my-8">
        <div className="text-lg">
          ${price} <span className="text-gray-500">/per person </span>
        </div>
        <div className="text-lg">{rating}</div>
      </div>
      <div className="border border-solid border-gray-300 p-2 ">
        <h2 className="text-xl mb-2">Information</h2>
        <form className="pt-2" onSubmit={bookpack}>
          <div className="border border-solid border-gray-300 my-4">
            {/* <input
              type="text"
              placeholder="Full Name"
              required
              onChange={HandleInputChange}
              className="w-full p-2 rounded-lg  text-base  border-b border-b-gray-400 mb-2 focus:outline-none "
            /> */}
            <input
              type="number"
              placeholder="Phone Number"
              name="phone"
              required
              value={phone}
              className="w-full p-2 rounded-lg  text-base  border-b border-b-gray-400 mb-2 focus:outline-none "
              onChange={HandleInputChange}
            />
            <div className="flex items-center gap-3">
              <input
                type="date"
                placeholder="date"
                required
                name="date"
                value={date}
                onChange={HandleInputChange}
                className="w-full p-2 rounded-lg  text-base  border-b border-b-gray-400 mb-2 focus:outline-none "
              />
              <input
                type="number"
                placeholder="Guest"
                required
                name="guests"
                value={guests}
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
              className="w-full bg-orange-400 rounded-3xl p-2 text-white font-semibold hover:bg-orange-500 "
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

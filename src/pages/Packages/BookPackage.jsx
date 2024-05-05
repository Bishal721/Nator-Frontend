import React, { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createBooking } from "../../redux/features/packages/packageSlice";
import authService from "../../services/authService";
import { getUser } from "../../redux/features/auth/authSlice";

const initialState = {
  guests: "",
};
const BookPackage = ({ price, rating, maxGroupSize, occupiedSpace }) => {
  const [bookingData, setBookingData] = useState(initialState);
  const [totalPrice, setTotalPrice] = useState(0);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };
  const { guests } = bookingData;
  console.log(typeof maxGroupSize);
  console.log(typeof occupiedSpace);
  const remainingSpace = maxGroupSize - occupiedSpace;
  useEffect(() => {
    setTotalPrice(price * guests);
  }, [price, guests]);

  const bookpack = async (e) => {
    e.preventDefault();
    let isloggedin = await authService.GetLoginStatus();
    if (!isloggedin) {
      toast.info("Please Log in first");
      return navigate("/login");
    }

    let user = await dispatch(getUser());
    if (user.payload.role === "admin") {
      return toast.error("Only User  can Book the packages");
    }

    if (!guests || !id) {
      return toast.error("All Fields are required");
    }
    if (parseInt(guests) <= 0) {
      return toast.info("Value must be greater than zero");
    }
    if (guests > maxGroupSize || guests > remainingSpace) {
      return toast.error(`Space Already full`);
    }
    let date = new Date()
      .toLocaleDateString("en-us", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");
    console.log(date);
    const formData = {
      guests,
      date,
      packageId: id,
      price: totalPrice,
    };
    console.log(formData);
    await dispatch(createBooking(formData));
  };
  return (
    <div className="sticky top-24">
      <div className="flex items-center justify-between my-8">
        <div className="text-lg">
          Rs {price} <span className="text-gray-500">/per person </span>
        </div>
        <div className="text-lg">{rating}</div>
      </div>
      <div className="border border-solid border-gray-300 p-2 ">
        <h2 className="text-3xl mb-2 text-orange-400">Personal Information</h2>
        <form className="pt-2" onSubmit={bookpack}>
          <div className="border border-solid border-gray-300 my-4 p-2">
            <label className="">Number of Person</label>
            <input
              type="number"
              placeholder="Number of Person"
              required
              name="guests"
              value={guests}
              onChange={HandleInputChange}
              className="w-full p-2 rounded-lg  text-base  border-b border-b-gray-400 my-2 focus:outline-none "
              min={0}
            />
          </div>
          <div className="mt-2 border border-solid border-gray-300">
            <div className="border-0 px-2 flex justify-between mb-2 ">
              <h5 className="flex items-center gap-1">
                Rs {price} <RiCloseLine /> {guests ? guests : 0} &nbsp;person
              </h5>
              <span>{price * guests}</span>
            </div>
            <div className="border-0 px-2 flex justify-between mb-2 font-bold">
              <h5 className="flex items-center gap-1">Total</h5>
              <span>Rs {totalPrice}</span>
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

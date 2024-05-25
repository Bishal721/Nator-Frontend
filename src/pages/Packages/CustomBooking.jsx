import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import Datepicker from "react-tailwindcss-datepicker";
import { RiCloseLine } from "react-icons/ri";
import authService, { BACKEND_URL } from "../../services/authService";
import { getUser } from "../../redux/features/auth/authSlice";
import { storeBookingFormData } from "../../redux/features/bookingdata/bookingdataSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

export const makeCustomPayment = async (formData) => {
  const stripe = await loadStripe(import.meta.env.VITE_PUBLISHABLE_API_KEY);
  const body = {
    products: [formData],
  };
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await axios.post(
    `${BACKEND_URL}/api/v1/package/customCheckout`,
    body, // Pass the body directly
    { headers: headers } // Pass headers as the third argument
  );

  const session = await response.data;
  console.log(session);
  const result = stripe.redirectToCheckout({
    sessionId: session.id,
  });

  if (result.error) {
    console.log(result.error);
  } else {
    onSuccess();
  }
};
const CustomBooking = ({ onClose }) => {
  const modelRef = useRef();
  const dispatch = useDispatch();
  const closeModel = (e) => {
    if (modelRef.current === e.target) {
      onClose();
    }
  };
  const { Package, isLoading } = useSelector((state) => state.package);
  const initialState = {
    guests: "",
    duration: Package?.duration || "",
    dates: { startDate: null, endDate: null },
  };
  const [bookingData, setBookingData] = useState(initialState);
  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };
  const handleDurationChange = (e) => {
    const { value } = e.target;
    setBookingData({ ...bookingData, duration: value });
  };
  const handleValueChange = (newValue) => {
    if (!bookingData.duration) {
      return toast.info("Please fill the duration field");
    }

    const startDate = new Date(newValue.startDate);

    // Calculate the end date
    const endDate = new Date(
      startDate.getTime() + bookingData.duration * 24 * 60 * 60 * 1000
    );

    // Convert endDate to a string in the same format as startDate
    const endDateString = endDate.toISOString().split("T")[0];
    const updatedValue = {
      startDate: newValue.startDate,
      endDate: endDateString,
    };

    setBookingData({ ...bookingData, dates: updatedValue });
  };
  const { guests, duration, dates } = bookingData;
  // Calculate date three days from now
  const currentDate = new Date();
  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + 3);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const defaultDuration = parseInt(Package?.duration);
    let dur = parseInt(duration);
    let packPrice = parseInt(Package?.price);
    let total;
    if (dur === defaultDuration) {
      total = packPrice * guests;
    } else if (dur > defaultDuration) {
      total = (packPrice / defaultDuration) * guests * dur;
    } else if (dur < defaultDuration) {
      total = (packPrice / defaultDuration) * guests * dur;
    }
    setTotalPrice(total);
  }, [Package?.price, Package?.duration, guests, duration]);

  const custombook = async (e) => {
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
    if (
      !guests ||
      !duration ||
      dates.startDate === null ||
      dates.endDate === null
    ) {
      return toast.error("All Fields are required");
    }
    if (parseInt(guests) < Package?.minGroupSize) {
      return toast.error(
        `Guest must be more than ${Package?.minGroupSize - 1}`
      );
    }
    if (parseInt(duration) <= 0) {
      return toast.info("Value must be greater than zero");
    }

    let date = new Date()
      .toLocaleDateString("en-us", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");
    const formData = {
      guests,
      date,
      duration,
      packageId: Package?._id,
      price: totalPrice,
      Bookfor: dates,
      name: Package?.name,
    };
    console.log(formData);

    const data = await dispatch(storeBookingFormData(formData));
    if (data.meta.requestStatus === "fulfilled") {
      await makeCustomPayment(formData);
    }
    alert("Hello Kiddos");
  };
  return (
    <>
      {isLoading && <Loader />}
      <div
        ref={modelRef}
        onClick={closeModel}
        className="fixed inset-0 bg-opacity-40 backdrop-blur-md flex mt-10 justify-center items-center z-[30]"
      >
        <div className="relative bg-neutral-100 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full flex-col space-y-3">
            <div className="flex flex-col items-center justify-center  space-y-2 ">
              <button className="place-self-end" onClick={onClose}>
                <RxCross2 size={26} />
              </button>
              <div className="font-semibold text-3xl text-center">
                <p>Custom Booking</p>
              </div>
              <div className="w-full text-sm ">
                <div className="text-lg mt-1">
                  Price Rs {Package?.price}
                  <span className="text-gray-500">/per person </span>
                </div>
                <p>Features and requirements</p>
                <ul className="list-inside list-disc">
                  <li>
                    The minimum number of guests should be more than
                    {Package?.minGroupSize - 1}
                  </li>
                  <li>
                    The Booking should be three Days after the current date
                  </li>
                  <li>
                    The duration for package is {Package?.duration} but you can
                    customize as per your need
                  </li>
                  <li>
                    The price will be accomodated according to number of days
                    and person
                  </li>
                </ul>
              </div>
            </div>
            <div className="">
              <form className="mt-1 lg:mt-2 md:space-y-5" onSubmit={custombook}>
                <div>
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
                  <label className="">Number of days</label>
                  <input
                    type="number"
                    placeholder="Duration"
                    required
                    name="duration"
                    value={duration}
                    onChange={handleDurationChange}
                    className="w-full p-2 rounded-lg  text-base  border-b border-b-gray-400 my-2 focus:outline-none "
                    min={0}
                  />
                  <label className="">Select date</label>
                  <Datepicker
                    value={dates}
                    onChange={handleValueChange}
                    asSingle={true}
                    primaryColor={"orange"}
                    useRange={false}
                    placeholder={"Enter Start Date"}
                    separator={"to"}
                    inputClassName="w-full h-full px-3 border border-gray-400  rounded text-gray-500  bg-white  caret-orange-400 focus:border-orange-400  "
                    containerClassName="relative h-9 w-full mb-3 "
                    toggleClassName="absolute rounded-r-lg text-orange-400 right-0 px-3 focus:outline-none h-full "
                    startFrom={futureDate}
                    displayFormat={"DD/MM/YYYY"}
                    popoverDirection="up"
                    minDate={futureDate}
                    showFooter={true}
                  />
                </div>
                <div className="mt-2 border border-solid border-gray-300">
                  <div className="border-0 px-2 flex justify-between mb-2 ">
                    <h5 className="flex items-center gap-1">
                      Total = Rs price per day <RiCloseLine /> number of guests{" "}
                      <RiCloseLine /> duration
                    </h5>
                  </div>
                  <div className="border-0 px-2 flex justify-between mb-2 font-bold">
                    <h5 className="flex items-center gap-1">Total</h5>
                    <span>Rs {totalPrice}</span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-orange-400 hover:bg-orange-300 focus:outline-none focus:ring-orange-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Custom Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomBooking;

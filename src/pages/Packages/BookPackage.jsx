import React, { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import authService, { BACKEND_URL } from "../../services/authService";
import { getUser } from "../../redux/features/auth/authSlice";
import Select from "react-select";
import { loadStripe } from "@stripe/stripe-js";
import { storeBookingFormData } from "../../redux/features/bookingdata/bookingdataSlice";
import CustomBooking from "./CustomBooking";

const initialState = {
  guests: "",
};
const makePayment = async (formData) => {
  const stripe = await loadStripe(import.meta.env.VITE_PUBLISHABLE_API_KEY);
  const body = {
    products: [formData],
  };
  const headers = {
    "Content-Type": "application/json",
  };
  const response = await axios.post(
    `${BACKEND_URL}/api/v1/package/checkout`,
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
const BookPackage = ({
  price,
  rating,
  maxGroupSize,
  Dates,
  packName,
  maxExtraPeople,
}) => {
  const [bookingData, setBookingData] = useState(initialState);
  const options = Dates?.map((date) => ({
    value: date._id,
    label: `${date.startDate.split("T")[0]} - ${date.endDate.split("T")[0]}`,
    space: date.occupiedSpace,
    extraSpace: date.extraPeople,
    status: date.status,
  }));
  const [showCustomBooking, setShowCustomBooking] = useState(false);

  const confirmCustomBooking = () => {
    confirmAlert({
      title: "Customize Booking",
      message:
        "Are you sure to Customize Booking. There are Some requirements that needs to be fulfilled to book as your wish ",
      buttons: [
        {
          label: "Yes",
          onClick: () => setShowCustomBooking(true),
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };
  const [selectedOptions, setSelectedOptions] = useState([]);
  const HandleSelectOption = (selectedoption) => {
    setSelectedOptions(selectedoption);
  };

  const [totalPrice, setTotalPrice] = useState(0);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };
  const { guests } = bookingData;
  const remainingSpace = maxGroupSize - selectedOptions.space;
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
    if (selectedOptions.status === "full") {
      toast.info("Package Already Full ");
      return toast.info("Please Select another Date ");
    }

    if (!guests || !id) {
      return toast.error("All Fields are required");
    }
    if (parseInt(guests) <= 0) {
      return toast.info("Value must be greater than zero");
    }

    let extraPeople = selectedOptions.extraSpace;
    let remainingGuests = parseInt(guests);

    if (remainingGuests > remainingSpace) {
      extraPeople += remainingGuests - remainingSpace;
      remainingGuests = remainingSpace;
    }

    if (extraPeople > maxExtraPeople) {
      return toast.error(
        "Traveller limit exceeds more than the maximum allowed"
      );
    }

    let date = new Date()
      .toLocaleDateString("en-us", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");
    const formData = {
      guests: remainingGuests,
      extraPeople: extraPeople > 0 ? extraPeople : 0,
      date,
      packageId: id,
      price: totalPrice,
      Bookfor: selectedOptions.label,
      dateId: selectedOptions.value,
      name: packName,
      specificDateId: selectedOptions.value,
    };
    const data = await dispatch(storeBookingFormData(formData));
    console.log(data);
    if (data.meta.requestStatus === "fulfilled") {
      await makePayment(formData);
    }
  };
  return (
    <div className="sticky top-24">
      <div>
        <div className="flex items-center justify-between my-8">
          <div className="text-lg">
            Rs {price} <span className="text-gray-500">/per person </span>
          </div>
          <div className="text-lg">{rating}</div>
        </div>
        <div className="border border-solid border-gray-300 p-2 ">
          <h2 className="text-3xl mb-2 text-orange-400">
            Personal Information
          </h2>
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
              <label className="">Select Date</label>
              <Select
                options={options}
                value={selectedOptions}
                name="date"
                onChange={HandleSelectOption}
                isMulti={false}
                placeholder="Select Date"
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
      <div className="mt-2">
        <div className="border border-solid border-gray-300 p-2 ">
          <h2 className="text-lg mb-2 text-orange-400">
            Customize the Booking As per Your need
          </h2>
          <p className="normal-case">
            Here you can book this particular package as your needs.Click button
            below to book the package
          </p>
          <div className="mt-3">
            <button
              type="button"
              className="w-full p-2 bg-orange-400 rounded-3xl text-white font-semibold hover:bg-orange-500"
              onClick={() => confirmCustomBooking()}
            >
              Customize Booking
            </button>
            {showCustomBooking && (
              <CustomBooking onClose={() => setShowCustomBooking(false)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPackage;

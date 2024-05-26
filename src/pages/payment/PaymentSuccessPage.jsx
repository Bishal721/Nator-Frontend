import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import {
  RESETBOOKING,
  createBooking,
  createCustomBooking,
  selectBookingFormData,
} from "../../redux/features/bookingdata/bookingdataSlice";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeformData = useSelector(selectBookingFormData);
  const bookingInitiated = useRef(false);

  // Extract paymentStatus from query parameters
  const queryParams = new URLSearchParams(window.location.search);
  const paymentStatus = queryParams.get("paymentStatus");

  useEffect(() => {
      if (paymentStatus !== "success" && paymentStatus !== "Customsuccess") {
      navigate("/");
      return;
    }
    if (
      (paymentStatus === "success" || paymentStatus === "Customsuccess") &&
      storeformData &&
      !bookingInitiated.current
    ) {
      bookingInitiated.current = true; // Set the ref to true before handling booking
      handleBooking();
    }

    // Prevent page from reloading
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [paymentStatus, navigate, storeformData]);

  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };

  const handleBooking = async () => {
    try {
      if (storeformData && paymentStatus === "success") {
        await dispatch(createBooking(storeformData));
        dispatch(RESETBOOKING());
      }
      if (storeformData && paymentStatus === "Customsuccess") {
        await dispatch(createCustomBooking(storeformData));
        dispatch(RESETBOOKING());
      }
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  const redirectToAnotherPage = () => {
    navigate("/packages");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center justify-center space-y-4">
        <FaCheckCircle className="text-green-500 text-8xl animate-pulse" />
        <h1 className="text-3xl font-bold text-gray-800">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-800 mb-8">
          Your payment has been processed successfully.
        </p>
        <button
          onClick={redirectToAnotherPage}
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;

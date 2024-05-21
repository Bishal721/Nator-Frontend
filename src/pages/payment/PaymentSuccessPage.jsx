import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  createBooking,
  selectBookingFormData,
} from "../../redux/features/packages/packageSlice";
import { useEffect } from "react";
const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeformData = useSelector(selectBookingFormData);
  useEffect(() => {
    // Check for query parameter indicating payment success
    const queryParams = new URLSearchParams(window.location.search);
    const paymentStatus = queryParams.get("paymentStatus");
    if (paymentStatus !== "success") {
      navigate("/");
    }
    if (storeformData) {
      // Use the formData to create booking
      dispatch(createBooking(storeformData));
    }

    console.log("Hello this is store data: " + storeformData);
  }, [location.search, navigate, storeformData, dispatch]);
  // Function to handle redirection

  const redirectToAnotherPage = () => {
    navigate("/packages"); // Replace '/another-page' with the desired route
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

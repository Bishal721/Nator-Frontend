import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa"; // Importing the times circle icon
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RESETBOOKING } from "../../redux/features/bookingdata/bookingdataSlice";

const PaymentUnsuccessfulPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Extract paymentStatus from query parameters
  const queryParams = new URLSearchParams(window.location.search);
  const paymentStatus = queryParams.get("paymentStatus");
  dispatch(RESETBOOKING());
  useEffect(() => {
    if (paymentStatus !== "canceled") {
      navigate("/");
    }

    // Prevent page from reloading
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [paymentStatus, navigate]);
  const handleBeforeUnload = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };
  const returnToPreviousPage = () => {
    // Go back to the previous page in history
    navigate("/packages");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center justify-center space-y-4">
        <FaTimesCircle className="text-red-500 text-6xl animate-bounce" />
        <h1 className="text-3xl font-bold text-gray-800">
          Payment Unsuccessful
        </h1>
        <p className="text-lg text-gray-800 mb-8">
          Your payment was rejected. Please try again.
        </p>
        <button
          onClick={returnToPreviousPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Return to Previous Page
        </button>
      </div>
    </div>
  );
};

export default PaymentUnsuccessfulPage;

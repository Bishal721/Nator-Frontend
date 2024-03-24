import { useState, useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import Loader from "./loader/Loader";
import { RESET, getOtp } from "../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";

const OtpInput = ({ length, onClose, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const inputRefs = useRef([]);
  const modelRef = useRef();

  const closeModel = (e) => {
    if (modelRef.current === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };
  const resendEmail = async () => {
    setIsLoading(true);
    dispatch(getOtp());
    dispatch(RESET());
    setIsLoading(false);
  };
  return (
    <>
      {isLoading && <Loader />}
      <div
        ref={modelRef}
        onClick={closeModel}
        className="fixed inset-0 bg-opacity-40 backdrop-blur-md flex justify-center items-center"
      >
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <button className="place-self-end" onClick={onClose}>
                <RxCross2 size={26} />
              </button>
              <div className="font-semibold text-3xl">
                <p>Please Verify Your Email</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email </p>
              </div>
            </div>

            <div>
              <form>
                <div className="flex flex-col space-y-9">
                  <div className="flex justify-center items-center gap-3">
                    {otp.map((value, index) => {
                      return (
                        <input
                          key={index}
                          type="text"
                          ref={(input) => (inputRefs.current[index] = input)}
                          value={value}
                          onChange={(e) => handleChange(index, e)}
                          onClick={() => handleClick(index)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          className="w-16 h-16 text-center text-lg border  border-black rounded-xl"
                          required
                        />
                      );
                    })}
                  </div>
                </div>
              </form>
              <div className="w-full mt-5 flex justify-center items-center ">
                <p className=" text-gray-400 ">
                  If you Didn't Receive Otp. &nbsp;
                </p>
                <p
                  className="cursor-pointer text-blue-600 "
                  onClick={resendEmail}
                >
                  <b>Resend Otp</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpInput;

import React, { useState } from "react";
import OtpInput from "../OtpInput";
import Loader from "../loader/Loader";
import { compareOtpResponse } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Notification = () => {
  const [showModel, setShowModel] = useState(false);
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onOtpSubmit = async (otp) => {
    const userData = {
      otp,
    };
    dispatch(compareOtpResponse(userData));
    setShowModel(false);
    window.location.reload(false);
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className="w-full border border-solid rounded bg-[#de1f1f33] flex justify-start p-4 mt-3">
        <p>
          <b>Message:</b> &nbsp;
        </p>
        <p>
          To verify your account, check your email for a verification code.
          &nbsp;
        </p>
        <p
          className="cursor-pointer text-blue-600 "
          onClick={() => setShowModel(true)}
        >
          <b>Verify Now</b>
        </p>
        {showModel && (
          <OtpInput
            length={6}
            onClose={() => setShowModel(false)}
            onOtpSubmit={onOtpSubmit}
          />
        )}
      </div>
    </>
  );
};

export default Notification;

import React, { useState } from "react";
import OtpInput from "../OtpInput";

const Notification = () => {
  const [showModel, setShowModel] = useState(false);
  return (
    <div className="w-full border border-solid rounded bg-[#de1f1f33] flex justify-start p-4 mt-3">
      <p>
        <b>Message:</b> &nbsp;
      </p>
      <p>
        To verify your account, check your email for a verification code. &nbsp;
      </p>
      <p
        className="cursor-pointer text-blue-600 "
        onClick={() => setShowModel(true)}
      >
        <b>Verify Now</b>
      </p>
      {showModel && <OtpInput length={6} onClose={() => setShowModel(false)} />}
    </div>
  );
};

export default Notification;

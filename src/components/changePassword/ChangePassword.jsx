import React, { useRef, useState } from "react";
import Loader from "../loader/Loader";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { changePassword } from "../../redux/features/auth/authSlice";

const ChangePassword = ({ onClose, onChnagePasswordSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const modelRef = useRef();
  const dispatch = useDispatch();
  const closeModel = (e) => {
    if (modelRef.current === e.target) {
      onClose();
    }
  };

  const initialState = {
    oldpassword: "",
    password: "",
    password2: "",
  };
  const [formData, setformData] = useState(initialState);
  const { oldpassword, password, password2 } = formData;
  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const changePass = async (e) => {
    e.preventDefault();
    console.log(password.length);
    if (password.length < 6) {
      return toast.error("Passwords must be at least 6 characters");
    }
    if (password !== password2) {
      return toast.error("New password Donot match");
    }
    const formData = {
      oldpassword,
      password,
    };

    const data = await dispatch(changePassword(formData));
    if (data.meta.requestStatus === "fulfilled") {
      onClose();
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div
        ref={modelRef}
        onClick={closeModel}
        className="fixed inset-0 bg-opacity-40 backdrop-blur-md flex justify-center items-center z-50"
      >
        <div className="relative bg-neutral-100 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-3">
            <div className="flex flex-col items-center justify-center text-center space-y-2 ">
              <button className="place-self-end" onClick={onClose}>
                <RxCross2 size={26} />
              </button>
              <div className="font-semibold text-3xl">
                <p>Change Password</p>
              </div>
            </div>
            <div className="">
              <form className="mt-2 lg:mt-3 md:space-y-5" onSubmit={changePass}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Old password
                  </label>
                  <input
                    type="password"
                    name="oldpassword"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:border-orange-500  block w-full p-2.5"
                    placeholder="Old password"
                    required={true}
                    value={oldpassword}
                    onChange={HandleInputChange}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    New password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:border-orange-500 block w-full p-2.5"
                    placeholder="New Password"
                    required={true}
                    value={password}
                    onChange={HandleInputChange}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Confirm New password
                  </label>
                  <input
                    type="password"
                    name="password2"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:border-orange-500 block w-full p-2.5"
                    placeholder="confirm New password"
                    required={true}
                    value={password2}
                    onChange={HandleInputChange}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-orange-400 hover:bg-orange-300 focus:outline-none focus:ring-orange-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Change passwod
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;

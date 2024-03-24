import React, { useLayoutEffect, useState } from "react";
import { useEffect } from "react";
import { FaBars, FaPowerOff, FaCog, FaBook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useRedirectLoggedOutUser from "../../customHooks/useRedirectLoggedOutUser";
import { toast } from "react-toastify";
import {
  getUser,
  logoutUser,
  updateUser,
} from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import Notification from "../../components/notification/Notification";

const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );
  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    bio: user?.bio || "",
    image: user?.image || "",
    country: user?.country || "",
    role: user?.role || "",
    isVerified: user?.isVerified || false,
  };
  const logout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
  const [profile, setProfile] = useState(initialState);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name: profile.name,
        phone: profile.phone,
        address: profile.address,
        city: profile.city,
        bio: profile.bio,
        country: profile.country,
      };
      dispatch(updateUser(formData));
      setInterval(() => {
        window.location.reload(false);
      }, 2000);
      toast.success("User Updated");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useLayoutEffect(() => {
    if (user) {
      setProfile({
        ...profile,
        name: user.name,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
        role: user.role,
        address: user.address,
        city: user.city,
        country: user.country,
        isVerified: user.isVerified,
      });
    }
  }, [user]);

  return (
    <>
      {isLoading && <Loader />}
      {profile?.isVerified === false ? <Notification /> : ""}
      {!isLoading && profile === null ? (
        <p>Semething Went Wrong, Please Reload The Page</p>
      ) : (
        <div className=" grid md:grid-cols-3 grid-cols-1 gap-7 w-full px-5 py-3 my-7">
          <div className=" border-2  border-solid rounded-md border-gray-300 p-2">
            <div className="flex justify-center">
              <p className="sm:text-3xl text-2xl">Personal Information</p>
            </div>

            <div className="flex justify-center py-4 place-items-center">
              <span className="rounded-full overflow-hidden md:w-48  h-auto ">
                <img src={user?.image} alt="profile Pic" />
              </span>
            </div>
            <div className="flex justify-center mt-4">
              <p className=" sm:text-2xl text-xl ">{profile?.name}</p>
            </div>
            <div className="grid gap-3 mt-20 ml-4 ">
              <Link className="flex text-xl items-center justify-self-start w-[55%] p-2  ml-3 > space-x-7 hover:text-gray-700 ">
                <FaBars size={25} />
                <span> My Tours</span>
              </Link>
              <Link className="flex text-xl items-center justify-self-start w-[55%] p-2  ml-3 > space-x-7 hover:text-gray-700 ">
                <FaBook size={25} />
                <span> My Bookings</span>
              </Link>
              <Link className="flex text-xl items-center justify-self-start w-[55%] p-2  ml-3 > space-x-7 hover:text-gray-700 ">
                <FaCog size={25} />
                <span> Settings</span>
              </Link>
              <button onClick={logout}>
                <Link className="flex text-xl items-center justify-self-start w-[55%] p-2  ml-3 > space-x-7 hover:text-gray-700 ">
                  <FaPowerOff size={25} />
                  <span> Logout</span>
                </Link>
              </button>
            </div>
          </div>
          <div className="border-2  col-span-2 border-solid  rounded-md border-gray-300">
            <div className="p-6">
              <h2 className="md:text-3xl text-md">Edit Profile</h2>
              <form onSubmit={updateProfile}>
                <div className="grid grid-cols-2 mt-4 ">
                  <div className="col-span-2 ">
                    <div className="col-span-2 ">
                      <div>
                        <label htmlFor="fname" className="md:text-xl text-md">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fname"
                          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                          value={profile?.name}
                          placeholder="John"
                          name="name"
                          onChange={HandleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div>
                        <label htmlFor="Email" className="md:text-xl text-md">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="Email"
                          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                          value={profile?.email}
                          disabled={true}
                          placeholder="Someone@gmail.com"
                          name="email"
                          onChange={HandleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="Phonenum"
                          className="md:text-xl text-md"
                        >
                          Phone Number
                        </label>
                        <input
                          type="text"
                          id="Phonenum"
                          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                          value={profile?.phone}
                          placeholder="+9771234567890"
                          name="phone"
                          onChange={HandleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-span-2 mt-4">
                      <div>
                        <label htmlFor="Address" className="md:text-xl text-md">
                          Address
                        </label>
                        <input
                          type="text"
                          id="Address"
                          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                          value={profile?.address}
                          placeholder="Address"
                          name="address"
                          onChange={HandleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div>
                        <label htmlFor="City" className="md:text-xl text-md">
                          City
                        </label>
                        <input
                          type="text"
                          id="City"
                          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                          value={profile?.city}
                          placeholder="City"
                          name="city"
                          onChange={HandleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="Country" className="md:text-xl text-md">
                          Country
                        </label>
                        <input
                          type="text"
                          id="Country"
                          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                          placeholder="Country"
                          value={profile?.country}
                          name="country"
                          onChange={HandleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-span-2 mt-4">
                      <label
                        htmlFor="file_input"
                        className="md:text-xl text-md"
                      >
                        Upload file
                      </label>
                      <div dir="rtl">
                        <input
                          className="block w-full py-2 px-3 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none  file:rounded
                      file:border-0 file:text-md file:font-semibold
                      file:bg-blue-400 file:text-white
                      hover:file:bg-blue-700 "
                          id="file_input"
                          type="file"
                          name="imagefile"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-span-2 mt-4">
                      <div>
                        <label htmlFor="message" className="md:text-xl text-md">
                          Bio
                        </label>
                        <textarea
                          id="message"
                          rows="6"
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg focus:outline-none focus:border-blue-500"
                          placeholder="About You"
                          value={profile?.bio}
                          required
                          onChange={HandleInputChange}
                          name="bio"
                        ></textarea>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 mt-4 justify-self-auto">
                      <div>
                        <button
                          type="submit"
                          className="bg-orange-600 mt-5 hover:bg-orange-400 text-white font-semibold rounded-md py-2 px-4 w-40"
                        >
                          Update Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

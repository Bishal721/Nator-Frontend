import React, { useLayoutEffect, useState } from "react";
import { useEffect } from "react";
import { FaBars, FaPowerOff, FaCog, FaBook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useRedirectLoggedOutUser from "../../customHooks/useRedirectLoggedOutUser";
import { toast } from "react-toastify";
import { getUser, updateUser } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import Notification from "../../components/notification/Notification";
import ChangePassword from "../../components/changePassword/ChangePassword";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isLoggedIn, isSuccess, message, user } = useSelector(
    (state) => state.auth
  );
  useRedirectLoggedOutUser("/login");
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
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState("");

  const [showChangeModel, setShowChangeModel] = useState(false);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const HandleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      // Handle Image Upload to Cloudinary
      let imageURL;
      if (
        profileImage &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", "bishalshrestha");
        image.append("upload_preset", "cffyxll1");

        // First save image to cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/bishalshrestha/image/upload",
          { method: "post", body: image }
        );
        const imgData = await response.json();
        imageURL = imgData.url.toString();
        console.log(imageURL);
      }

      const formData = {
        name: profile.name,
        phone: profile.phone,
        address: profile.address,
        city: profile.city,
        bio: profile.bio,
        country: profile.country,
        image: profileImage ? imageURL : profile.image,
      };
      const data = await dispatch(updateUser(formData));
      if (data.meta.requestStatus) {
        navigate("/");
      }
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
      {!profile?.isVerified && <Notification />}
      {!isLoading && profile === null ? (
        <p>Semething Went Wrong, Please Reload The Page</p>
      ) : (
        <div className="flex flex-col ">
          <div className="bg-zinc-100 mt-1">
            <div className="relative">
              <div className="w-full h-72 bg-gray-300 rounded-lg p-2 md:p-0">
                <img
                  src={user?.image}
                  alt="Cover Photo"
                  className="w-full  h-72 object-cover rounded-lg "
                />
              </div>

              <div className="absolute top-60 left-0 w-full  md:left-8 lg:left-10 md:w-[95%] ">
                <div className="flex items-center justify-between flex-col  md:flex-row">
                  <div className="flex items-center flex-col  md:flex-row md:gap-5 gap-2">
                    <div className="bg-white p-1 rounded-full w-40 h-40  md:w-44 md:h-44 object-cover">
                      <img
                        src={user?.image}
                        alt="Profile Photo"
                        className="rounded-full w-40 h-40 md:w-44 md:h-44 object-cover"
                      />
                    </div>
                    <div className="mt-4">
                      <h2 className="text-xl font-bold">{profile?.name}</h2>
                    </div>
                  </div>
                  <div className="flex mt-4 space-x-4">
                    <button
                      className="bg-orange-400 text-white px-4 py-2 rounded-md"
                      onClick={() => setShowChangeModel(true)}
                    >
                      Change Password
                    </button>
                  </div>
                  {showChangeModel && (
                    <ChangePassword onClose={() => setShowChangeModel(false)} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-60 mb-8  md:mt-40 border-2  col-span-2 border-solid  rounded-md border-gray-300">
            <div className="p-6">
              <h2 className="md:text-3xl text-md">Edit Profile</h2>
              <form onSubmit={updateProfile}>
                <div className="grid mt-4 ">
                  <div className=" text-sm">
                    <div className="">
                      <label htmlFor="fname" className="md:text-xl text-md">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fname"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-500"
                        value={profile?.name}
                        placeholder="John"
                        name="name"
                        onChange={HandleInputChange}
                        required
                      />
                    </div>
                    <div className="grid  md:grid-cols-2 gap-3 mt-4">
                      <div>
                        <label htmlFor="Email" className="md:text-xl text-md">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="Email"
                          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-500 bg-white "
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
                          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-500"
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
                          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-500"
                          value={profile?.address}
                          placeholder="Address"
                          name="address"
                          onChange={HandleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 mt-4">
                      <div>
                        <label htmlFor="City" className="md:text-xl text-md">
                          City
                        </label>
                        <input
                          type="text"
                          id="City"
                          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-500"
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
                          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-orange-500"
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
                      <div
                        dir="rtl"
                        className="border border-solid border-gray-300 rounded-md bg-white"
                      >
                        <input
                          className="block w-full text-sm text-slate-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-violet-200 file:text-violet-700
                      hover:file:bg-violet-100 "
                          id="file_input"
                          type="file"
                          name="image"
                          onChange={HandleImageChange}
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
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg focus:outline-none focus:border-orange-500"
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
                          className="bg-orange-400 mt-5 hover:bg-orange-500 text-white font-semibold rounded-md py-2 px-4 w-40"
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

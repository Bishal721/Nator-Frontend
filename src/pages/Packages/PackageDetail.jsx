import React, { useEffect, useState } from "react";
import {
  createReview,
  getPackage,
} from "../../redux/features/packages/packageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdStarOutline } from "react-icons/io";
import { AiFillDollarCircle } from "react-icons/ai";
import { GiDuration } from "react-icons/gi";
import { RiGroupLine, RiStarSFill } from "react-icons/ri";
import { PiMountainsFill } from "react-icons/pi";
import DOMPurify from "dompurify";
import { useRef } from "react";
import BookPackage from "./BookPackage";
import avatar from "../../assets/avatar.jpg";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

const PackageDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { Package, isLoading, isError, message } = useSelector(
    (state) => state.package
  );
  // const packageEdit = useSelector(selectPackage);
  const isloggedin = useSelector(selectIsLoggedIn);

  // const [selectPackage, setPackages] = useState(packageEdit);
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);

  useEffect(() => {
    dispatch(getPackage(id));
    // setPackages(packageEdit);

    if (isError) {
      console.log(message);
    }
  }, [isError, message, dispatch, id]);

  const submitReview = (e) => {
    e.preventDefault();
    if (!isloggedin) {
      return toast.error("User Must Be Logged In Give Reviews");
    }
    const reviewText = reviewMsgRef.current.value;
    if (!reviewText || !tourRating || !id) {
      return toast.error("All Fields are required to post review");
    }

    const formData = {
      packageId: id,
      review: reviewText,
      rating: tourRating,
    };

    dispatch(createReview(formData));
  };

  const options = { day: "numeric", month: "long", year: "numeric" };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="grid grid-cols-6 gap-2 mt-4">
      {/* {isLoading && <Loader />} */}
      <div className="col-span-4  p-4">
        <div className=" w-full h-[30rem] overflow-hidden object-cover rounded">
          {Package?.image ? (
            <img
              src={Package.image.filePath}
              alt={Package.image.fileName}
              className="w-full"
            />
          ) : (
            <p>No image Found</p>
          )}
        </div>

        <div className="p-2 w-full border border-gray-300 my-4 text-sm">
          <span className="text-2xl">{Package?.name}</span>
          <div className="mt-4 flex gap-10 items-center capitalize">
            <span className="flex items-center ">
              <IoLocationOutline size={23} /> &nbsp; {Package?.location}
            </span>
            <span className=" flex items-center ">
              <IoMdStarOutline size={23} /> &nbsp;{Package?.review || 2}
            </span>
          </div>
          <div className="mt-4 flex gap-10 items-center capitalize">
            <span className="flex items-center ">
              <AiFillDollarCircle size={23} /> &nbsp; {Package?.price}
              &nbsp;/per person
            </span>
            <span className="flex items-center ">
              <GiDuration size={23} /> &nbsp; {Package?.duration}
            </span>
            <span className="flex items-center ">
              <RiGroupLine size={23} /> &nbsp; {Package?.maxGroupSize}
              &nbsp; persons
            </span>
            <span className="flex items-center ">
              <PiMountainsFill size={23} /> &nbsp; difficulty level &nbsp;
              <strong>{Package?.difficulty}</strong>
            </span>
          </div>
          <div className="mt-4 flex gap-10 items-center capitalize">
            <h2 className="text-xl">Description</h2>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(Package?.description),
            }}
            className="capitalize mt-4 "
          ></div>
        </div>

        <div className="p-2 w-full border border-gray-300 my-4 text-sm">
          <h4 className="text-2xl mb-4">
            Reviews ({Package?.reviews.length} reviews)
          </h4>
          <form onSubmit={submitReview}>
            <div className="flex item-center gap-2 mb-4">
              <span
                className="flex items-center cursor-pointer text-orange-400"
                onClick={() => setTourRating(1)}
              >
                1 <RiStarSFill size={26} />
              </span>
              <span
                className="flex items-center cursor-pointer text-orange-400"
                onClick={() => setTourRating(2)}
              >
                2 <RiStarSFill size={20} />
              </span>
              <span
                className="flex items-center cursor-pointer text-orange-400"
                onClick={() => setTourRating(3)}
              >
                3 <RiStarSFill size={26} />
              </span>
              <span
                className="flex items-center cursor-pointer text-orange-400"
                onClick={() => setTourRating(4)}
              >
                4 <RiStarSFill size={26} />
              </span>
              <span
                className="flex items-center cursor-pointer text-orange-400"
                onClick={() => setTourRating(5)}
              >
                5 <RiStarSFill size={26} />
              </span>
            </div>

            <div className="flex items-center justify-between w-full p-2 rounded-3xl border border-solid border-orange-400">
              <input
                type="text"
                ref={reviewMsgRef}
                className="w-full border-none py-2 px-0 focus:outline-none bg-inherit"
                placeholder="share your thoughts here"
                required
              />
              <button
                className="bg-orange-400 hover:bg-orange-500 text-white  rounded-[2rem] py-2 px-4 w-44"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="mt-10  mx-4 pt-4 px-3">
            {Package?.reviews.length === 0 ? (
              <div className="flex justify-start items-center capitalize">
                <div className="text-lg text-red-500 mx-4">
                  Reviews Not available
                </div>
              </div>
            ) : (
              Package?.reviews.map((review, index) => (
                <div key={index} className="flex items-center gap-x-4 mb-4">
                  <img
                    src={avatar}
                    className="w-14 h-14 rounded-full object-cover"
                  />

                  <div className="w-full  p-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-lg mb-0 ">John</h5>
                        <p className="text-sm text-gray-500">
                          {new Date("01-03-2024").toLocaleDateString(
                            "en-US",
                            options
                          )}
                        </p>
                      </div>
                      <span className="flex items-center font-medium ">
                        5 <RiStarSFill className="text-xl text-orange-400" />
                      </span>
                    </div>
                    <h6 className="text-xl text-gray-600">Amazing tour</h6>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="p-4 col-span-2 rounded-lg border border-solid border-gray-300  ">
        <BookPackage price={Package?.price} rating={Package?.ratingsAverage} />
      </div>
    </div>
  );
};

export default PackageDetail;

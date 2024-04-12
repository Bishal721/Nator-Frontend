import React, { useEffect, useState } from "react";
import {
  getPackage,
  selectPackage,
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

const PackageDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoading, isError, message } = useSelector((state) => state.package);
  const packageEdit = useSelector(selectPackage);

  const [packages, setPackages] = useState(packageEdit);
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);

  useEffect(() => {
    dispatch(getPackage(id));
    setPackages(packageEdit);

    if (isError) {
      console.log(message);
    }
  }, [isError, message, dispatch, id, packageEdit]);

  // useEffect(() => {
  //   setPackages(packageEdit);
  // }, [packag eEdit]);
  const submitReview = (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    alert(`${reviewText}, ${tourRating}`);
  };
  return (
    <div className="grid grid-cols-6 gap-2 mt-4">
      <div className="col-span-4  p-4">
        <div className=" w-full h-[30rem] overflow-hidden object-cover rounded">
          {packages?.image ? (
            <img
              src={packages.image.filePath}
              alt={packages.image.fileName}
              className="w-full"
            />
          ) : (
            <p>No image Found</p>
          )}
        </div>

        <div className="p-2 w-full border border-gray-300 my-4 text-sm">
          <span className="text-2xl hover:text-blue-600 ">
            {packages?.name}
          </span>
          <div className="mt-4 flex gap-10 items-center capitalize">
            <span className="flex items-center ">
              <IoLocationOutline size={23} /> &nbsp; {packages?.location}
            </span>
            <span className=" flex items-center ">
              <IoMdStarOutline size={23} /> &nbsp; {packages?.ratingsAverage || 2}
            </span>
          </div>
          <div className="mt-4 flex gap-10 items-center capitalize">
            <span className="flex items-center ">
              <AiFillDollarCircle size={23} /> &nbsp; {packages?.price}
              &nbsp;/per person
            </span>
            <span className="flex items-center ">
              <GiDuration size={23} /> &nbsp; {packages?.duration}
            </span>
            <span className="flex items-center ">
              <RiGroupLine size={23} /> &nbsp; {packages?.maxGroupSize}&nbsp;
              persons
            </span>
            <span className="flex items-center ">
              <PiMountainsFill size={23} /> &nbsp; difficulty level &nbsp;
              <strong>{packages?.difficulty}</strong>
            </span>
          </div>
          <div className="mt-4 flex gap-10 items-center capitalize">
            <h2 className="text-xl">Description</h2>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(packages?.description),
            }}
            className="capitalize mt-4 "
          ></div>
        </div>

        <div className="p-2 w-full border border-gray-300 my-4 text-sm">
          <h4 className="text-2xl mb-4">Reviews (4 reviews)</h4>
          <form onSubmit={submitReview}>
            <div className="flex item-center gap-2 mb-4">
              <span
                className="flex items-center cursor-pointer text-orange-400"
                onClick={() => setTourRating(1)}
              >
                1 <RiStarSFill size={20} />
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
                3 <RiStarSFill size={20} />
              </span>
              <span
                className="flex items-center cursor-pointer text-orange-400"
                onClick={() => setTourRating(4)}
              >
                4 <RiStarSFill size={20} />
              </span>
              <span
                className="flex items-center cursor-pointer text-orange-400"
                onClick={() => setTourRating(5)}
              >
                5 <RiStarSFill size={20} />
              </span>
            </div>

            <div className="flex items-center justify-between w-full p-2 rounded-3xl border border-solid border-orange-400">
              <input
                type="text"
                ref={reviewMsgRef}
                className="w-full border-none py-2 px-0 focus:outline-none bg-inherit"
                placeholder="share your thoughts here"
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white  rounded-[2rem] py-2 px-4 w-44"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="p-4 col-span-2 rounded-lg border border-solid border-gray-300  ">
        <BookPackage
          price={packages?.price}
          rating={packages?.ratingsAverage}
        />
      </div>
    </div>
  );
};

export default PackageDetail;

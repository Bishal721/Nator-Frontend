import React, { useEffect, useRef, useState } from "react";
import Card from "../../components/card/Card";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPackages } from "../../redux/features/packages/packageSlice";
import Loader from "../../components/loader/Loader";
import { IoLocationOutline } from "react-icons/io5";
import { GiDuration } from "react-icons/gi";
import {
  RESETLOCATION,
  selectLocationFormData,
} from "../../redux/features/bookingdata/bookingdataSlice";
const Packages = () => {
  const dispatch = useDispatch();
  const { packages, isLoading, isError, message } = useSelector(
    (state) => state.package
  );
  const PackageInitiated = useRef(false);
  const storeLocationData = useSelector(selectLocationFormData);
  const initialState = {
    location: storeLocationData || "",
  };
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  useEffect(() => {
    if (!PackageInitiated.current) {
      PackageInitiated.current = true;
      if (initialState.location) {
        dispatch(getPackages(initialState));
      } else {
        dispatch(getPackages());
      }
      // Dispatch RESETLOCATION only if needed, after a specific action, not immediately
      // dispatch(RESETLOCATION());
    }
  }, [dispatch, initialState]);
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
  }, [isError, message]);
  const handleShowAll = async () => {
    dispatch(RESETLOCATION());
    dispatch(getPackages());
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && packages.length === 0 ? (
        <div className="flex justify-center items-center">
          <div className="text-2xl text-red-500">No Packages Available</div>
        </div>
      ) : (
        <div className=" border">
          <div className="grid md:grid-cols-4 ">
            <div className="col-start-4">
              <button
                className="w-full bg-orange-400 hover_bg-orange-500 p-3 text-white rounded"
                onClick={handleShowAll}
              >
                Show All Packages
              </button>
            </div>
          </div>
          <div className="grid  md:grid-cols-3  gap-6 p-4">
            {packages.map((pack, index) => {
              const { name, price, location, _id } = pack;
              return (
                <Card key={index}>
                  <div className="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md">
                    <div className="relative  h-72  overflow-hidden  bg-white bg-clip-border text-gray-700">
                      <div className="h-full w-full">
                        {pack.image ? (
                          <img
                            src={pack.image.filePath}
                            alt={pack.image.fileName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <img
                            src=""
                            alt="Image Not found "
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                    </div>
                    <div className="px-4 pt-2">
                      <div className="mb-2">
                        <Link to={`/package-details/${_id}`}>
                          <p className="block font-sans text-xl font-medium leading-relaxed text-orange-400 capitalize  antialiased">
                            {shortenText(name, 22)}
                          </p>
                        </Link>
                      </div>
                      <div className="mb-2  flex items-center justify-between">
                        <p className=" font-sans text-base  leading-relaxed capitalize flex items-center justify-center  antialiased">
                          <span className="text-orange-400">
                            <IoLocationOutline size={23} />
                          </span>
                          {location}
                        </p>
                        <p className="flex items-center justify-center leading-relaxed text-gray-900 capitalize  antialiased">
                          <span className="text-orange-400">
                            <GiDuration size={23} />
                          </span>
                          {pack.duration} days
                        </p>
                      </div>
                      <div className="mb-2 flex items-center justify-between">
                        <p className="block font-sans text-base leading-relaxed  antialiased">
                          <span className="text-orange-400 font-semibold">
                            Rs {price}
                          </span>
                          &nbsp;/ Per Person
                        </p>
                        <span>
                          <Link to={`/package-details/${_id}`}>
                            <button
                              className=" rounded-lg bg-orange-400 p-2 text-white align-middle font-sans text-base  transition-all  hover:bg-orange-400 "
                              type="button"
                            >
                              Book Now
                            </button>
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Packages;

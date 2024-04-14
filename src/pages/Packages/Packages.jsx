import React, { useEffect } from "react";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPackages } from "../../redux/features/packages/packageSlice";
import { SpinnerImage } from "../../components/loader/Loader";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdStarOutline } from "react-icons/io";

const Packages = () => {
  const dispatch = useDispatch();
  const { packages, isLoading, isError, message } = useSelector(
    (state) => state.package
  );

  // console.log(packages);

  useEffect(() => {
    dispatch(getPackages());
    // console.log(nm);
    if (isError) {
      console.log(message);
    }
  }, [dispatch, isError, message]);

  return (
    <>
      {isLoading && <SpinnerImage />}
      {!isLoading && packages.length === 0 ? (
        <div className="flex justify-center items-center">
          <div className="text-2xl text-red-500">No Packages Available</div>
        </div>
      ) : (
        <div className=" border">
          <div className="grid  md:grid-cols-3  gap-6 p-4">
            {packages.map((pack, index) => {
              const { name, price, location, _id } = pack;
              return (
                <Card key={index}>
                  <div className="relative flex flex-col bg-white bg-clip-border text-gray-700 shadow-md">
                    <div className="relative  h-72  overflow-hidden  bg-white bg-clip-border text-gray-700">
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
                    <div className="px-4 pt-2">
                      <div className="mb-2">
                        <Link to={`/package-details/${_id}`}>
                          <p className="block font-sans text-xl font-medium leading-relaxed text-orange-400 capitalize  antialiased">
                            {name}
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
                            <IoMdStarOutline size={23} />
                          </span>
                          4
                        </p>
                      </div>
                      <div className="mb-2 flex items-center justify-between">
                        <p className="block font-sans text-base leading-relaxed  antialiased">
                          <span className="text-orange-400 font-semibold">
                            &#36; {price}
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

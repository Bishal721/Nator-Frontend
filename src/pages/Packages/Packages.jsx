import React, { useEffect } from "react";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPackages } from "../../redux/features/packages/packageSlice";
import { SpinnerImage } from "../../components/loader/Loader";
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
          <div className="grid  md:grid-cols-3  gap-3 p-4">
            {packages.map((pack, index) => {
              const {
                name,
                price,
                rating,
                location,
                difficulty,
                summary,
                _id,
              } = pack;
              return (
                <Card key={index}>
                  <div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                    <div className="relative mx-4 mt-4 h-72  overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                      <img
                        src="https://course.zinotrustacademy.com/wp-content/uploads/2023/09/Udemy-Course-Image-5.png"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                          {name}
                        </p>
                        <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                          Rs {price}
                        </p>
                      </div>
                      <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                        {summary}
                      </p>
                    </div>
                    <div className="p-6 pt-0">
                      <Link to={`/package-details/${_id}`}>
                        <button
                          className="block w-full select-none rounded-lg bg-blue-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105  hover:bg-blue-300 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                        >
                          View Details
                        </button>
                      </Link>
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

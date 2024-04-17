import React from "react";
import heroImg from "../../assets/Flighthero.png";
import Datepicker from "react-tailwindcss-datepicker";
import { CiSearch } from "react-icons/ci";

const Flight = () => {
  const styles = {
    backgroundImage: `url(${heroImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <>
      <section className="h-screen" style={styles}>
        <div className="h-full w-full flex flex-col justify-center  items-center px-[4rem] ">
          <h3 className="text-white font-bold text-6xl">
            Explore the world together
          </h3>
          <h5 className="text-white text-xl">
            Find awesome flights, hotel, tour, car and packages
          </h5>
        </div>
        {/* <button className="w-[10rem] py-[6px] rounded-3xl bg-[#98EC65] hover:bg-[#81E047] mt-[1rem]">
          Explore Now
        </button> */}
      </section>

      <div className="container">
        <div className="border border-red-400 py-6 rounded-2xl h-40 flex items-center justify-center relative -top-20 bg-slate-100 shadow-2xl">
          <form className="sm:flex-row flex-col">
            <div className="flex h-16 p-2  border-none bg-none w-full sm:flex-nowrap flex-wrap ">
              <div className="w-1/2 flex ">
                <input
                  type="text"
                  className="w-full sm:w-[60%] bg-white rounded border-2 border-gray-200 hover:bg-gray-100 caret-orange-400 focus:border-orange-400  pl-2  text-gray-600 font-normal outline-0 sm:mr-2 mr-0"
                  placeholder="Search for your destination..."
                  required
                />
                <input
                  type="text"
                  className="w-full sm:w-[60%] bg-white rounded border-2 border-gray-200 hover:bg-gray-100 caret-orange-400 focus:border-orange-400  pl-2  text-gray-600 font-normal outline-0 sm:mr-2 mr-0"
                  placeholder="Search for your destination..."
                  required
                />
              </div>
              <div className="flex w-1/2 border border-red-300">
                <Datepicker
                  // value={value}
                  // onChange={handleValueChange}
                  primaryColor={"orange"}
                  useRange={false}
                  placeholder={"Start Date to End Date"}
                  separator={"to"}
                  inputClassName="w-full h-full px-3 rounded text-gray-500 outline-0 hover:bg-gray-100  bg-white border-x-1 border-x-gray-200  caret-orange-400 focus:border-orange-400  "
                  containerClassName="relative"
                  toggleClassName="absolute rounded-r-lg text-orange-400 right-0 h-full px-3 focus:outline-none "
                  startFrom={new Date()}
                  displayFormat={"DD/MM/YYYY"}
                  minDate={new Date()}
                  showFooter={true}
                />
                <button
                  type="submit"
                  className="bg-orange-400 w-full sm:w-[50%] ml-2 flex items-center justify-center rounded h-auto text-white font-semibold "
                >
                  <CiSearch size={25} />
                  &nbsp; Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Flight;

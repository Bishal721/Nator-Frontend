import React, { useEffect, useState } from "react";
import heroImg from "../../assets/HotelHero.jpg";
import hotelA from "../../assets/HotelA.jpg";
import hotelB from "../../assets/HotelB.jpg";
import Datepicker from "react-tailwindcss-datepicker";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllHotels } from "../../redux/features/hotels/hotelSlice";
import { FaPerson } from "react-icons/fa6";
import { NewSearch } from "../../redux/features/hotels/SearchSlice";
import DOMPurify from "dompurify";
import Loader from "../../components/loader/Loader";

const Hotel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hotels, isloading, isError, message } = useSelector(
    (state) => state.hotel
  );

  let firstFourElements = [];
  const initialState = {
    city: "",
    min: "",
    max: "",
  };
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  useEffect(() => {
    dispatch(getAllHotels(initialState));
    if (isError) {
      console.log(message);
    }
  }, [dispatch, isError, message]);

  if (hotels.length >= 4 && hotels.length >= 1) {
    firstFourElements = hotels.slice(0, 4);
  }

  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    setDates(newValue);
  };
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSubmit = (e) => {
    const formData = {
      city: destination,
      dates,
      options,
    };
    e.preventDefault();
    const data = dispatch(NewSearch({ payload: formData }));
    navigate("/hotel-list", { state: formData });
  };

  const styles = {
    backgroundImage: `url(${heroImg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <>
      {isloading && <Loader />}
      <section className="h-screen" style={styles}>
        <div className="bg-[#222222] opacity-35 h-full w-full absolute top-[4.75rem] mix-blend-multiply [transition:background_0.3s,_border-radius_0.3s,_opacity_0.3s] z-10"></div>
        <div className="relative  h-full w-full flex flex-col justify-center  items-center px-[4rem] z-30">
          <h3 className="text-white font-bold text-6xl">
            Luxury Hotel And Best Resort
          </h3>
          <h5 className="text-white text-xl mt-3">
            Our Amazing hotel has some of the best rooms on earth. Book Now for
            the best summer deals.
          </h5>
        </div>
      </section>

      <div className="container mb-8">
        <div className=" py-6 h-36  relative z-30 [box-shadow:0px_0px_10px_0px_rgba(0,0,0,0.5)] m-0 -mt-24  bg-slate-50">
          <form
            className="sm:flex-row flex-col px-4 flex items-center justify-center mt-4"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-12  h-16 p-2 [box-shadow:rgba(0,_0,_0,_0.19)_0px_10px_20px,_rgba(0,_0,_0,_0.23)_0px_6px_6px]   w-full  gap-1">
              <div className="col-span-6">
                <div className="grid grid-cols-6 h-full gap-1">
                  <div className="col-span-3">
                    <input
                      type="text"
                      className="w-full h-full bg-white rounded border-2 border-gray-300 hover:bg-gray-100 caret-orange-400 focus:border-orange-400  pl-2  text-gray-600 font-normal outline-0 sm:mr-2 mr-0"
                      placeholder="Search for your destination..."
                      onChange={(e) => setDestination(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-span-3 ">
                    <Datepicker
                      value={dates}
                      onChange={handleValueChange}
                      primaryColor={"orange"}
                      useRange={false}
                      placeholder={"Start Date to End Date"}
                      separator={"to"}
                      inputClassName="w-full h-full px-3 border border-gray-400  rounded text-gray-500  bg-white  caret-orange-400 focus:border-orange-400  "
                      containerClassName="relative h-full"
                      toggleClassName="absolute rounded-r-lg text-orange-400 right-0 px-3 focus:outline-none h-full  "
                      startFrom={new Date()}
                      displayFormat={"DD/MM/YYYY"}
                      minDate={new Date()}
                      showFooter={true}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-6">
                <div className="grid grid-cols-6 h-full gap-1">
                  <div className="col-span-3 border border-gray-400 rounded">
                    <div className="flex items-center justify-center h-full gap-[10px] ">
                      <FaPerson />
                      <span
                        onClick={() => setOpenOptions(!openOptions)}
                        className="text-gray-500 cursor-pointer"
                      >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                      {openOptions && (
                        <div className="absolute top-[108px] bg-[white] text-[gray] rounded-[5px] [box-shadow:0px_0px_10px_-5px_rgba(0,_0,_0,_0.4)]">
                          <div className="w-[200px] flex justify-between m-[10px]">
                            <span className="text-md font-medium">Adult</span>
                            <div className="flex items-center gap-[10px] text-[12px] text-[black]">
                              <button
                                type="button"
                                disabled={options.adult <= 1}
                                className="w-[30px] h-[30px] border-[1px] border-[solid] flex items-center justify-center  border-orange-400 text-[#0071c2] cursor-pointer bg-[white]"
                                onClick={() => handleOption("adult", "d")}
                              >
                                -
                              </button>
                              <span className="text-md font-medium">
                                {options.adult}
                              </span>
                              <button
                                type="button"
                                className="w-[30px] h-[30px] border-[1px] border-[solid] flex items-center justify-center  border-orange-400 text-[#0071c2] cursor-pointer bg-[white]"
                                onClick={() => handleOption("adult", "i")}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="w-[200px] flex justify-between m-[10px]">
                            <span className="text-md font-medium">
                              Children
                            </span>
                            <div className="flex items-center gap-[10px] text-[12px] text-[black]">
                              <button
                                type="button"
                                disabled={options.children <= 0}
                                className="w-[30px] h-[30px] border-[1px] border-[solid] flex items-center justify-center  border-orange-400 text-[#0071c2] cursor-pointer bg-[white]"
                                onClick={() => handleOption("children", "d")}
                              >
                                -
                              </button>
                              <span className="text-md font-medium">
                                {options.children}
                              </span>
                              <button
                                type="button"
                                className="w-[30px] h-[30px] border-[1px] border-[solid] flex items-center justify-center  border-orange-400 text-[#0071c2] cursor-pointer bg-[white]"
                                onClick={() => handleOption("children", "i")}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="w-[200px] flex justify-between m-[10px]">
                            <span className="text-md font-medium">Room</span>
                            <div className="flex items-center gap-[10px] text-[12px] text-[black]">
                              <button
                                type="button"
                                disabled={options.room <= 1}
                                className="w-[30px] h-[30px] border-[1px] border-[solid] flex items-center justify-center  border-orange-400 text-[#0071c2] cursor-pointer bg-[white]"
                                onClick={() => handleOption("room", "d")}
                              >
                                -
                              </button>
                              <span className="text-md font-medium">
                                {options.room}
                              </span>
                              <button
                                type="button"
                                className="w-[30px] h-[30px] border-[1px] border-[solid] flex items-center justify-center  border-orange-400 text-[#0071c2] cursor-pointer bg-[white]"
                                onClick={() => handleOption("room", "i")}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-span-3">
                    <button
                      type="submit"
                      className="bg-orange-400  w-full h-full flex items-center justify-center rounded text-white font-semibold "
                    >
                      <CiSearch size={25} />
                      &nbsp; Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <section className="mx-auto w-full  max-w-7xl my-0 py-0 px-5 mt-8">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-6  w-full my-8 mx-4 p-4">
            <div>
              <img src={hotelA} alt="" className="w-full" />
            </div>

            <div className="text-justify mt-8">
              <p>
                Featuring A 24-Hour Front Desk And A Large Outdoor Swimming
                Pool, The Hyatt Regency Kathmandu Is Located Just 0.8 Mi From
                The Famous UNESCO World Heritage Of Boudhanath Stupa.The
                Property Is Located 4.3 Mi From The Famous Tourist Destination
                Of Thamel. Kathmandu International Airport Is Located 2.5 Mi
                Away.
              </p>
            </div>
            <div className="grid grid-cols-3 mt-4 text-white font-semibold">
              <button className="w-full h-12 bg-orange-400 hover:bg-orange-300">
                View More
              </button>
            </div>
          </div>
          <div className="col-span-6 my-8 mx-4 p-4">
            <div className="flex justify-between items-center flex-col">
              <h2 className="text-5xl font-bold mb-8 ">
                Experience the Life of Mykonos City
              </h2>
              <p className="text-justify text-md">
                Featuring A 24-Hour Front Desk And A Large Outdoor Swimming
                Pool, The Hyatt Regency Kathmandu Is Located Just 0.8 Mi From
                The Famous UNESCO World Heritage Of Boudhanath Stupa.The
                Property Is Located 4.3 Mi From The Famous Tourist Destination
                Of Thamel. Kathmandu International Airport Is Located 2.5 Mi
                Away.
              </p>
            </div>
            <div className="mt-8">
              <img src={hotelB} alt="" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 w-full max-w-7xl my-0 py-0 px-5 mx-auto">
        <h3 className="text-5xl font-bold capitalize ">Popular Hotels</h3>
        <div className="flex justify-between items-center my-8">
          <p className="text-justify w-1/2 mt-4 text-md">
            During the course of time, developers do not need that, but in the
            development of the clinical phase, the airline always needs fear.
          </p>
          <div className="text-white font-semibold mr-9">
            <Link to={"/hotel-list"}>
              <button className="w-44 h-12 bg-orange-400 hover:bg-orange-300">
                View All
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full mb-4">
          <div className="grid grid-cols-12 gap-4">
            {hotels.length >= 4 && hotels.length >= 1
              ? firstFourElements.map((item) => (
                  <div
                    key={item._id}
                    className="col-span-3 w-[95%] h-[26rem] border border-gray-400 p-4"
                  >
                    <div className="w-full object-cover overflow-hidden h-64">
                      <img
                        src={item?.photos?.filePath || hotelA}
                        alt="Hotel"
                        className="w-full h-full object-cover overflow-hidden"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg ">
                        {shortenText(item?.name, 22)}
                      </h3>
                      {/* <p
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            shortenText(item.desc, 20)
                          ),
                        }}
                        className="mt-4 "
                      ></p> */}
                    </div>

                    <div className="w-1/2 my-4 text-white font-semibold ">
                      <Link to={`/hotel-detail/${item._id}`}>
                        <button className="capitalize bg-orange-400 h-11 hover:bg-orange-300 w-full ">
                          Read More
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              : hotels.map((item) => (
                  <div
                    key={item._id}
                    className="col-span-3 w-full h-[30rem] border border-gray-400 p-4"
                  >
                    <div className="w-full object-fill overflow-hidden h-64">
                      <img
                        src={item?.photos?.filePath || hotelA}
                        alt="Hotel"
                        className="w-full h-full object-fill overflow-hidden"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium my-4">
                        {shortenText(item?.name, 22)}
                      </h3>
                      {/* <p
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            shortenText(item.desc, 50)
                          ),
                        }}
                        className="mt-4"
                      ></p> */}
                    </div>

                    <div className=" w-1/2 my-4 text-white font-semibold">
                      <Link to={`/hotel-detail/${item._id}`}>
                        <button className="capitalize bg-orange-400 h-11 hover:bg-orange-300 w-full ">
                          Read More
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hotel;

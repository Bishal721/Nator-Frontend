import React, { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createBooking } from "../../redux/features/packages/packageSlice";
import { FaPerson } from "react-icons/fa6";
import Datepicker from "react-tailwindcss-datepicker";

const initialState = {
  phone: "",
  guests: "",
  date: "",
};
const BookHotel = ({ price, rating }) => {
  const [bookingData, setBookingData] = useState(initialState);
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };
  const { phone } = bookingData;
  const [openOptions, setOpenOptions] = useState(false);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const getTomorrowDate = () => {
    let tomorrow = new Date(); // Tomorrow's date
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const [dates, setDates] = useState({
    startDate: new Date().toISOString().split("T")[0],
    endDate: getTomorrowDate(),
  });
  console.log(dates);
  const handleValueChange = (newValue) => {
    setDates(newValue);
  };

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const [days, setDays] = useState(0); // Initialize days state
  const [total, setTotal] = useState("");

  useEffect(() => {
    const diffDays = Math.ceil(
      (new Date(dates.endDate) - new Date(dates.startDate)) /
        MILLISECONDS_PER_DAY
    );
    setDays(diffDays); // Update days state
    setTotal(diffDays * price * options.room);
  }, [options, dates, price]);

  const bookpack = async (e) => {
    e.preventDefault();
    const formData = {
      phone,
    };
    console.log(formData);
    // dispatch(createBooking(formData));
  };
  return (
    <div className="sticky top-24">
      <div className="flex items-center justify-between my-8">
        <div className="text-lg">
          ${price} <span className="text-gray-500">/per person </span>
        </div>
        <div className="text-lg">{rating}</div>
      </div>
      <div className="border border-solid border-gray-300 p-2 ">
        <h2 className="text-xl mb-2">Information</h2>
        <form className="pt-2" onSubmit={bookpack}>
          <div className="border border-solid border-gray-300 my-4">
            <input
              type="number"
              placeholder="Phone Number"
              name="phone"
              required
              value={phone}
              className="w-full p-2 rounded-lg  text-base  border-b border-b-gray-400 mb-2 focus:outline-none "
              onChange={HandleInputChange}
            />
            <div className="flex items-center gap-3">
              <Datepicker
                value={dates}
                onChange={handleValueChange}
                primaryColor={"orange"}
                useRange={false}
                placeholder={"Start Date to End Date"}
                separator={"to"}
                inputClassName="w-full h-full px-3 border border-gray-400  rounded text-gray-500  bg-white  caret-orange-400 focus:border-orange-400  "
                containerClassName="relative h-9 w-full mb-3"
                toggleClassName="absolute rounded-r-lg text-orange-400 right-0 px-3 focus:outline-none h-full  "
                startFrom={new Date()}
                displayFormat={"DD/MM/YYYY"}
                popoverDirection="down"
                minDate={new Date()}
                // showFooter={true}
              />
            </div>
            <div className="flex items-center justify-center h-9 gap-[10px] bg-white">
              <FaPerson />
              <span
                onClick={() => setOpenOptions(!openOptions)}
                className="text-gray-500 cursor-pointer"
              >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
              {openOptions && (
                <div className="absolute top-[270px] w-80 bg-[white] text-[gray] rounded-[5px] [box-shadow:0px_0px_10px_-5px_rgba(0,_0,_0,_0.4)] flex flex-col items-center">
                  <div className="w-[200px] flex justify-between items-center m-[10px]">
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
                    <span className="text-md font-medium">Children</span>
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
          <div className="mt-2 border border-solid border-gray-300">
            <div className="border-0 px-2 flex justify-between mb-2 ">
              <h5 className="flex items-center gap-1">
                ${price} <RiCloseLine /> {days} days <RiCloseLine />
                {options.room} rooms
              </h5>
              <span>{price}</span>
            </div>
            <div className="border-0 px-2 flex justify-between mb-2 font-bold">
              <h5 className="flex items-center gap-1">Total</h5>
              <span>$ {total}</span>
            </div>
          </div>
          <div className="mt-3">
            <button
              type="submit"
              className="w-full bg-orange-400 rounded-3xl p-2 text-white font-semibold hover:bg-orange-500 "
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookHotel;

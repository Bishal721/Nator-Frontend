import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getHotel } from "../../redux/features/hotels/hotelSlice";
import Loader from "../../components/loader/Loader";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdStarOutline } from "react-icons/io";
import { AiFillDollarCircle } from "react-icons/ai";
import DOMPurify from "dompurify";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import Reserve from "./Reserve";
import Datepicker from "react-tailwindcss-datepicker";
import { toast } from "react-toastify";
const HotelDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, message, Hotel } = useSelector(
    (state) => state.hotel
  );
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [openModal, setOpenModal] = useState(false);
  const handleClick = () => {
    if (isLoggedIn === true) {
      if (!dates.startDate || !dates.endDate) {
        return toast.error("Please fill the date");
      }
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    dispatch(getHotel(id));

    if (isError) console.log(message);
  }, [dispatch, isError, message]);

  const getTomorrowDate = () => {
    let tomorrow = new Date(); // Tomorrow's date
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const [dates, setDates] = useState({
    startDate: new Date().toISOString().split("T")[0],
    endDate: getTomorrowDate(),
  });
  const handleValueChange = (newValue) => {
    setDates(newValue);
  };
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

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const [days, setDays] = useState(0); // Initialize days state
  const [total, setTotal] = useState("");

  useEffect(() => {
    const diffDays = Math.ceil(
      (new Date(dates.endDate) - new Date(dates.startDate)) /
        MILLISECONDS_PER_DAY
    );
    setDays(diffDays); // Update days state
    setTotal(diffDays * Hotel?.cheapestPrice);
  }, [dates, Hotel?.cheapestPrice, total]);
  return (
    <div className="grid grid-cols-6 gap-2 mt-4">
      {isLoading && <Loader />}
      <div className="col-span-4  p-4">
        <div className=" w-full h-[30rem] overflow-hidden object-cover rounded">
          {Hotel?.photos ? (
            <img
              src={Hotel?.photos.filePath}
              alt={Hotel?.photos.fileName}
              className="w-full"
            />
          ) : (
            <p>No image Found</p>
          )}
        </div>

        <div className="p-2 w-full border border-gray-300 my-4 text-sm">
          <span className="text-2xl">{Hotel?.name}</span>
          <div className="mt-4 flex gap-10 items-center capitalize">
            <span className="flex items-center ">
              <IoLocationOutline size={23} /> &nbsp; {Hotel?.address}
            </span>
            <span className=" flex items-center ">
              <IoMdStarOutline size={23} /> &nbsp;
              {Hotel?.rating || "Not Rated"}
            </span>
          </div>
          <div className="mt-4 flex gap-10 items-center capitalize">
            <span className="flex items-center ">
              <AiFillDollarCircle size={23} /> &nbsp; {Hotel?.cheapestPrice}
              &nbsp;/per person
            </span>
            <span className="flex items-center ">
              Excellent location – {Hotel?.distance}m from center
            </span>
          </div>
          <div className="mt-4 flex gap-10 items-center capitalize">
            <h2 className="text-xl">Description</h2>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(Hotel?.desc),
            }}
            className="capitalize mt-4 "
          ></div>
        </div>
      </div>
      <div className="p-4 col-span-2 rounded-lg border border-solid border-gray-300  ">
        <div className="flex justify-between gap-[20px] mt-[20px]">
          <div className="flex-[1] bg-[#ebf3ff] p-[20px] flex flex-col gap-[20px]">
            <h1 className="text-[18px] text-[#555]">
              Perfect for a {days}-night stay!
            </h1>
            <span className="text-[14px]">
              Located in the real heart of {Hotel?.city}, this property has an
              excellent location
            </span>
            <h2 className="font-light">
              <b>Rs {total}</b> ({days} nights)
            </h2>

            <div className="w-full">
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
              />
            </div>
            <button
              onClick={handleClick}
              className="border-[none] px-[20px] py-[10px] bg-orange-400 text-[white] font-bold cursor-pointer rounded-[5px]"
            >
              Reserve or Book Now!
            </button>
          </div>
        </div>
      </div>
      {openModal && (
        <Reserve setOpen={setOpenModal} hotelId={id} dates={dates} />
      )}
    </div>
  );
};

export default HotelDetail;

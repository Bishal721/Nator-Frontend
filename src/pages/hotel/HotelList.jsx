import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";

import SearchItem from "../../components/searchItem/SearchItem";
import Datepicker from "react-tailwindcss-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { getAllHotels } from "../../redux/features/hotels/hotelSlice";
import Loader from "../../components/loader/Loader";

const HotelList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoading, isError, message, hotels } = useSelector(
    (state) => state.hotel
  );
  const [destination, setDestination] = useState(
    location.state === null ? "" : location.state.city
  );
  const getTomorrowDate = () => {
    let tomorrow = new Date(); // Tomorrow's date
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };
  const [dates, setDates] = useState(
    // location.state === null
    //   ?
    {
      startDate: new Date().toISOString().split("T")[0],
      endDate: getTomorrowDate(),
    }
    // : useSelector((state) => state.search.dates)
  );
  const [openDate, setOpenDate] = useState(true);
  const [options, setOptions] = useState(
    location.state === null
      ? {
          adult: 1,
          children: 0,
          room: 1,
        }
      : location.state.options
  );
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const initialState = {
    city: destination || "",
    min: min || "",
    max: max || "",
  };

  //   const { data, loading, error, reFetch } = useFetch(
  //     `/hotels?city=${destination}&min=${min || 0 }&max=${max || 999}`
  //   );

  // if (location.state === null) {
  useEffect(() => {
    dispatch(getAllHotels(initialState));
    if (isError) {
      console.log(message);
    }
  }, [dispatch, isError]);


  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getAllHotels(initialState));
  };

  return (
    <div>
      <div className="flex justify-center mt-8">
        <div className="w-full max-w-screen-lg flex gap-[20px]">
          <div className="flex-[1] bg-[#febb02] p-[10px] rounded-[10px] sticky top-[10px] h-max max-w-80">
            <h1 className="text-[20px] text-[#555] mb-[10px]">Search</h1>
            <div className="flex flex-col gap-[5px] mb-[10px]">
              <label className="text-[12px]">Destination</label>
              <input
                value={destination}
                placeholder={destination}
                className="h-[30px] border-[none] p-[5px]"
                type="text"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-[5px] mb-[10px]">
              <label className="text-[12px]">Check-in Date</label>
              <span
                className="h-[30px] p-[5px] bg-[white] flex items-center cursor-pointer"
                onClick={() => setOpenDate(!openDate)}
              >
                {`${format(
                  dates.startDate,
                  "MM/dd/yyyy"
                )} to ${format(dates.endDate, "MM/dd/yyyy")}`}
              </span>
              {openDate && (
                <Datepicker
                  value={value}
                  onChange={handleValueChange}
                  minDate={new Date()}
                  primaryColor={"orange"}
                  useRange={false}
                  placeholder={"Start Date to End Date"}
                  separator={"to"}
                  inputClassName="w-full h-full px-3  text-gray-500 outline-0 hover:bg-gray-100  bg-white border-x-1 border-x-gray-200  caret-orange-400 focus:border-orange-400  "
                  containerClassName="relative bg-red-400 h-8 mt-1 "
                  toggleClassName="absolute rounded-r-lg text-orange-400 right-0 px-3 focus:outline-none h-full  "
                  startFrom={new Date()}
                  displayFormat={"DD/MM/YYYY"}
                  popoverDirection="down"
                  showFooter={true}
                />
              )}
            </div>
            <div className="flex flex-col gap-[5px] mb-[10px] ">
              <label>Options</label>
              <div className="p-[10px]">
                <div className="flex justify-between mb-[10px] text-[#555] text-[12px]">
                  <span className="">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="w-[50px]"
                  />
                </div>
                <div className="flex justify-between mb-[10px] text-[#555] text-[12px]">
                  <span className="">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="w-[50px]"
                  />
                </div>
                <div className="flex justify-between mb-[10px] text-[#555] text-[12px]">
                  <span className="">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="w-[50px]"
                    placeholder={options.adult}
                  />
                </div>
                <div className="flex justify-between mb-[10px] text-[#555] text-[12px]">
                  <span className="">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="w-[50px]"
                    placeholder={options.children}
                  />
                </div>
                <div className="flex justify-between mb-[10px] text-[#555] text-[12px]">
                  <span className="">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="w-[50px]"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <div>
                <button
                  className="w-full text-white h-10 rounded bg-orange-400 capitalize"
                  type="button"
                  onClick={handleClick}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="flex-[3]">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {hotels.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelList;

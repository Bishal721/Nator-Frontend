import { useLocation } from "react-router-dom";
import { useState } from "react";
// import { format } from "date-fns";
// import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
// import useFetch from "../../hooks/useFetch";

const HotelList = () => {
  const location = useLocation();
    // const [destination, setDestination] = useState(location.state.destination);
    // const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  //   const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  //   const { data, loading, error, reFetch } = useFetch(
  //     `/hotels?city=${destination}&min=${min || 0 }&max=${max || 999}`
  //   );

  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <div className="flex justify-center mt-8">
        <div className="w-full max-w-screen-lg flex gap-[20px]">
          <div className="flex-[1] bg-[#febb02] p-[10px] rounded-[10px] sticky top-[10px] h-max">
            <h1 className="text-[20px] text-[#555] mb-[10px]">Search</h1>
            <div className="flex flex-col gap-[5px] mb-[10px]">
              <label className="text-[12px]">Destination</label>
              <input
                //    placeholder={destination}
                className="h-[30px] border-[none] p-[5px]"
                type="text"
              />
            </div>
            {/* <div className="flex flex-col gap-[5px] mb-[10px]">
              <label className="text-[12px]">Check-in Date</label>
              <span className="h-[30px] p-[5px] bg-[white] flex items-center cursor-pointer" onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div> */}
            <div className="flex flex-col gap-[5px] mb-[10px]">
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
                    // placeholder={options.adult}
                  />
                </div>
                <div className="flex justify-between mb-[10px] text-[#555] text-[12px]">
                  <span className="">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="w-[50px]"
                    // placeholder={options.children}
                  />
                </div>
                <div className="flex justify-between mb-[10px] text-[#555] text-[12px]">
                  <span className="">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="w-[50px]"
                    // placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          {/* <div className="flex-[3]">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HotelList;

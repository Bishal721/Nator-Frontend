import React, { useEffect, useState } from "react";
import { FaCircleXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getHotelRooms } from "../../redux/features/hotels/hotelSlice";
import Loader from "../../components/loader/Loader";
import { updateRoomAvailability } from "../../redux/features/rooms/roomSlice";
import { useNavigate } from "react-router-dom";
const Reserve = ({ setOpen, hotelId, dates }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hotels, isLoading, isError, message } = useSelector(
    (state) => state.hotel
  );

  useEffect(() => {
    dispatch(getHotelRooms(hotelId));
    if (isError) {
      console.log(message);
    }
  }, [dispatch, hotelId, message, isError]);
  const [selectedRooms, setSelectedRooms] = useState([]);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates.startDate, dates.endDate);
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };
  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  const handleClick = async () => {
    try {
      for (const roomId of selectedRooms) {
        const formData = {
          dates: alldates,
        };

        // Dispatch an action to update room availability
        dispatch(updateRoomAvailability({ id: roomId, formData }));
      }

      // Once all rooms are updated, perform any necessary actions
      setOpen(false);
      // Navigate if needed
      navigate("/hotels");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className="w-screen h-screen bg-[rgba(0,_0,_0,_0.418)] fixed top-[0] left-[0] flex items-center justify-center">
        <div className="bg-[white] p-[20px] relative">
          <FaCircleXmark
            className="absolute top-[0] right-[0] cursor-pointer"
            onClick={() => setOpen(false)}
          />

          <span>Select your rooms:</span>
          {hotels.map((item) => (
            <div
              className="flex items-center gap-[50px] p-[20px]"
              key={item._id}
            >
              <div className="rItemInfo">
                <div className="font-medium">{item.title}</div>
                <div className="font-light">{item.desc}</div>
                <div className="text-[12px]">
                  Max people: <b>{item.maxPeople}</b>
                </div>
                <div className="font-medium">
                  Price: <b>{item.price}</b>
                </div>
              </div>
              <div className="flex flex-wrap gap-[5px] text-[8px] text-[gray]">
                {item.roomNumbers?.map((roomNumber) => (
                  <div className="flex flex-col" key={roomNumber._id}>
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      //   name=""
                      value={roomNumber._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}
                      id=""
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleClick}
            className="border-[none] px-[20px] py-[10px] bg-orange-400 text-[white] font-bold cursor-pointer rounded-[5px] w-full mt-[20px]"
          >
            Reserve Now!
          </button>
        </div>
      </div>
    </>
  );
};

export default Reserve;

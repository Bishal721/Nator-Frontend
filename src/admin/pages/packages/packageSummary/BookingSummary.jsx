import React from "react";
import { TbBrandBooking, TbPackages } from "react-icons/tb";
import { useSelector } from "react-redux";
import { HiOutlineUsers } from "react-icons/hi";
import { FaHotel } from "react-icons/fa";
import CustomInfoBox from "../../infoBox/CustomInfoBox";
//Icons
const totalPackageIcon = <TbPackages size={30} color="#fff" />;
const totalUserIcon = <HiOutlineUsers size={30} color="#fff" />;
const totalBookingIcon = <TbBrandBooking size={30} color="#fff" />;
const outOfStockIcon = <FaHotel size={30} color="#fff" />;

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const shortenText = (text, n) => {
  if (text.length > n) {
    const shortenedText = text.substring(0, n).concat("...");
    return shortenedText;
  }
  return text;
};

const BookingSummary = () => {
  const { bookings, custombookings } = useSelector((state) => state.booking);
  const canceledCount = bookings.filter(
    (booking) => booking.status.toLowerCase() === "canceled"
  ).length;
  const CustomcanceledCount = custombookings.filter(
    (cus) => cus.status.toLowerCase() === "canceled"
  ).length;
  return (
    <div className="w-full">
      <h3 className="my-4 text-2xl"> Status</h3>
      <div className="flex flex-wrap ">
        <CustomInfoBox
          icon={totalUserIcon}
          title={"Total Bookings"}
          count={bookings.length}
          bgColor="bg-[#b624ff]"
        />
        <CustomInfoBox
          icon={totalPackageIcon}
          title={shortenText("Total Custom Bookings", 11)}
          count={custombookings.length}
          bgColor="bg-[#32963d]"
        />
        <CustomInfoBox
          icon={totalBookingIcon}
          title={shortenText("Canceled Bookings", 15)}
          count={canceledCount}
          bgColor="bg-[#03a5fc]"
        />
        <CustomInfoBox
          icon={outOfStockIcon}
          title={shortenText("Total Custom Canceled Bookings", 15)}
          count={CustomcanceledCount}
          bgColor="bg-[#01a93d]"
        />
      </div>
    </div>
  );
};

export default BookingSummary;

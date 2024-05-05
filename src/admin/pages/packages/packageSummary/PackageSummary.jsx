import React, { useEffect } from "react";
import { BsCartX } from "react-icons/bs";
import { TbBrandBooking, TbPackages } from "react-icons/tb";
import { useSelector } from "react-redux";
import InfoBox from "../../infoBox/InfoBox";
import { HiOutlineUsers } from "react-icons/hi";
//Icons
const totalPackageIcon = <TbPackages size={40} color="#fff" />;
const totalUserIcon = <HiOutlineUsers size={40} color="#fff" />;
const totalBookingIcon = <TbBrandBooking size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const PackageSummary = ({ packages }) => {
  const { users } = useSelector((state) => state.auth);

  return (
    <div className="w-full">
      <h3 className="my-4 text-2xl"> Status</h3>
      <div className="flex flex-wrap ">
        <InfoBox
          icon={totalUserIcon}
          title={"Total User"}
          count={users.length}
          bgColor="bg-[#b624ff]"
        />
        <InfoBox
          icon={totalPackageIcon}
          title={"Total Packages"}
          count={packages.length}
          bgColor="bg-[#32963d]"
        />{" "}
        <InfoBox
          icon={totalBookingIcon}
          title={"Total Bookings"}
          // count={products.length}
          bgColor="bg-[#03a5fc]"
        />
        <InfoBox
          icon={outOfStockIcon}
          title={"Total Packages"}
          // count={`Rs${formatNumbers(totalStoreValue.toFixed(2))}`}
          bgColor="bg-[#32963d]"
        />
      </div>
    </div>
  );
};

export default PackageSummary;

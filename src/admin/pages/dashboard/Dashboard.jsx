import React, { useEffect } from "react";
import PackageSummary from "../packages/packageSummary/PackageSummary";
import { useDispatch, useSelector } from "react-redux";
import PackageList from "../packages/packageList/PackageList";
import {
  getAllUsers,
  selectIsLoggedIn,
} from "../../../redux/features/auth/authSlice";
import { getPackages } from "../../../redux/features/packages/packageSlice";
import HotelList from "../../components/hotelform/HotelList";
import { getAllHotels } from "../../../redux/features/hotels/hotelSlice";
import {
  RESETBOOKINGARR,
  getAllBookings,
} from "../../../redux/features/bookingdata/bookingdataSlice";
const initialState = {
  city: "",
  min: "",
  max: "",
};
const Dashboard = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { packages, isLoading, isError, message } = useSelector(
    (state) => state.package
  );

  const { hotels } = useSelector((state) => state.hotel);
  const { bookings } = useSelector((state) => state.booking);
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getPackages());
      dispatch(getAllHotels(initialState));
      dispatch(getAllUsers());
      dispatch(RESETBOOKINGARR());
      dispatch(getAllBookings());
    }
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <PackageSummary packages={packages} hotels={hotels} bookings={bookings} />
      <PackageList packages={packages} isLoading={isLoading} />
      <HotelList hotels={hotels} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;

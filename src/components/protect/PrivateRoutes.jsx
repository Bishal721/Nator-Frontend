import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import {
  selectIsLoggedIn,
  selectUser,
} from "../../redux/features/auth/authSlice";
const PrivateRoutes = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  console.log(isLoggedIn );
  return isLoggedIn && user?.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
};

export default PrivateRoutes;

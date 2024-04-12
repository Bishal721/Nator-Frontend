import React, { useEffect } from "react";
import PackageSummary from "../packages/packageSummary/PackageSummary";
import { useDispatch, useSelector } from "react-redux";
import PackageList from "../packages/packageList/PackageList";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getPackages } from "../../../redux/features/packages/packageSlice";
const Dashboard = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { packages, isLoading, isError, message } = useSelector(
    (state) => state.package
  );
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getPackages());
    }
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);
  return (
    <div>
      <PackageSummary packages={packages} />
      <PackageList packages={packages} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;

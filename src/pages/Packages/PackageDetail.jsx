import React, { useEffect } from "react";
import { getPackage } from "../../redux/features/packages/packageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const PackageDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { Package, isLoading, isError, message } = useSelector(
    (state) => state.package
  );
  useEffect(() => {
    dispatch(getPackage(id));
    if (isError) {
      console.log(message);
    }
  }, [isError, message, dispatch, id]);
  return <div>Hello</div>;
};

export default PackageDetail;

import React, { useEffect } from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
// import {
//   CALC_STORE_VALUE,
//   selectOutOfStock,
//   selectTotalStoreValue,
//   CALC_OUTOFSTOCK,
//   CALC_Category,
//   selectCategory,
// } from "../../../redux/features/product/productSlice";
import InfoBox from "../../infoBox/InfoBox";
//Icons
const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const PackageSummary = ({ packages }) => {
  const dispatch = useDispatch();
  // const totalStoreValue = useSelector(selectTotalStoreValue);
  // const OutOfStock = useSelector(selectOutOfStock);
  // const AllCategory = useSelector(selectCategory);

  // useEffect(() => {
  //   dispatch(CALC_STORE_VALUE(products));
  //   dispatch(CALC_OUTOFSTOCK(products));
  //   dispatch(CALC_Category(products));
  // }, [dispatch, products]);
  return (
    <div className="w-full">
      <h3 className="my-4 text-2xl"> Status</h3>
      <div className="flex flex-wrap ">
        <InfoBox
          icon={productIcon}
          title={"Total User"}
          // count={products.length}
          bgColor="bg-[#b624ff]"
        />
        <InfoBox
          icon={earningIcon}
          title={"Total Packages"}
          // count={`Rs${formatNumbers(totalStoreValue.toFixed(2))}`}
          bgColor="bg-[#32963d]"
        />{" "}
        <InfoBox
          icon={productIcon}
          title={"Total User"}
          // count={products.length}
          bgColor="bg-[#b624ff]"
        />
        <InfoBox
          icon={earningIcon}
          title={"Total Packages"}
          // count={`Rs${formatNumbers(totalStoreValue.toFixed(2))}`}
          bgColor="bg-[#32963d]"
        />
      </div>
    </div>
  );
};

export default PackageSummary;

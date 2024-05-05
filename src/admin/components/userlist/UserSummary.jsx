import React, { useEffect } from "react";
import { BiUserCheck, BiUserMinus, BiUserX } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import InfoBox from "../../pages/infoBox/InfoBox";
import {
  CALC_SUSPENDED_USER,
  CALC_VERIFIED_USER,
} from "../../../redux/features/auth/authSlice";

//Icons
// const earningIcon = <FaUsers size={40} color="#fff" />;
// const productIcon = <BsCart4 size={40} color="#fff" />;
// const categoryIcon = <BiCategory size={40} color="#fff" />;
// const outOfStockIcon = <BsCartX size={40} color="#fff" />;

const icon1 = <FaUsers size={40} color="#fff" />;
const icon2 = <BiUserCheck size={40} color="#fff" />;
const icon3 = <BiUserMinus size={40} color="#fff" />;
const icon4 = <BiUserX size={40} color="#fff" />;

const UserSummary = () => {
  const dispatch = useDispatch();
  const { users, verifiedUsers, suspendedUsers } = useSelector(
    (state) => state.auth
  );
  const unverifiedUsers = users.length - verifiedUsers;

  useEffect(() => {
    dispatch(CALC_VERIFIED_USER());
    dispatch(CALC_SUSPENDED_USER());
  }, [dispatch, users]);
  return (
    <div className="w-full">
      <h3 className="my-4 text-2xl"> Status</h3>
      <div className="flex flex-wrap ">
        <InfoBox
          icon={icon1}
          title={"Total User"}
          count={users.length}
          bgColor="bg-[#b624ff]"
        />
        <InfoBox
          icon={icon2}
          title={"Verified Users"}
          count={verifiedUsers}
          bgColor="bg-[#32963d]"
        />{" "}
        <InfoBox
          icon={icon3}
          title={"Unverified Users"}
          count={unverifiedUsers}
          bgColor="bg-[#03a5fc]"
        />
        <InfoBox
          icon={icon4}
          title={"Suspended Users"}
          count={suspendedUsers}
          bgColor="bg-[#c41849]"
        />
      </div>
    </div>
  );
};

export default UserSummary;

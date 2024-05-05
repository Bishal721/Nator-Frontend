import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  getAllUsers,
  upgradeUser,
} from "../../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const ChangeRole = ({ _id }) => {
  const options = [
    {
      value: "user",
      label: "User",
    },
    {
      value: "admin",
      label: "Admin",
    },
    {
      value: "suspended",
      label: "Suspended",
    },
  ];
  const [userRole, setUserRole] = useState(null);
  const dispatch = useDispatch();
  const HandleSelectOption = (selectedoption) => {
    setUserRole(selectedoption);
  };

  // Change User role
  const changeRole = async (e) => {
    e.preventDefault();
    if (!userRole) {
      return toast.error("Please select a role");
    }

    const userData = {
      role: userRole.value,
      id: _id,
    };

    await dispatch(upgradeUser(userData));
    setUserRole(null);
    await dispatch(getAllUsers());
  };

  return (
    <div className="sort">
      <form
        className="flex justify-start gap-3 items-center"
        onSubmit={(e) => changeRole(e, _id, userRole)}
      >
        <Select
          options={options}
          onChange={HandleSelectOption}
          className="w-[50%] outline-none border-none bg-red-300"
          menuPortalTarget={document.body}
          placeholder={"Select Role"}
        />

        <button
          type="submit"
          className="text-lg w-10 h-9 font-normal px-2 py-1 ml-0 mr-1 my-0 border border-solid border-transparent rounded cursor-pointer flex justify-center items-center transition-all text-white bg-orange-300"
        >
          <FaCheck size={15} />
        </button>
      </form>
    </div>
  );
};

export default ChangeRole;

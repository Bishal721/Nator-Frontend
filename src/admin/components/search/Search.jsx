import React from "react";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  return (
    <div className={"mx-[0] my-[5px] relative flex-[1]"}>
      <BiSearch
        size={18}
        className={"absolute top-2/4 left-4 -translate-y-1/2"}
      />
      <input
        type="text"
        placeholder="Search "
        value={value}
        onChange={onChange}
        className="block text-xl  font-light p-2 pl-12 mx-[auto] my-4 w-full border-[1px] border-[solid] border-[#777] rounded-[3px] outline-[none]"
      />
    </div>
  );
};

export default Search;

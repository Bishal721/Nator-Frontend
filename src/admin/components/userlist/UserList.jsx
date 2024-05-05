import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SpinnerImage } from "../../../components/loader/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import UserSummary from "./UserSummary";
import {
  deleteUser,
  getAllUsers,
} from "../../../redux/features/auth/authSlice";
import {
  FILTER_USERS,
  selectFilteredUsers,
} from "../../../redux/features/packages/FilterSlice";
import Search from "../search/Search";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import ChangeRole from "../changerole/ChangeRole";
import { confirmAlert } from "react-confirm-alert";
const UserList = () => {
  const [search, setSearch] = useState("");
  const filteredUsers = useSelector(selectFilteredUsers);

  const dispatch = useDispatch();
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const { users, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const removeUser = async (id) => {
    await dispatch(deleteUser(id));
    dispatch(getAllUsers());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete This User",
      message: "Are you sure to do delete this user?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeUser(id),
        },
        {
          label: "Cancel",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  //Begin Pagination

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredUsers.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredUsers.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredUsers]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;

    setItemOffset(newOffset);
  };

  //End Pagination
  useEffect(() => {
    dispatch(FILTER_USERS({ users, search }));
  }, [users, search, dispatch]);

  return (
    <div>
      <UserSummary />
      <div className="text-[#333]">
        <hr />
        <div className="p-[5px] w-full overflow-x-auto">
          <div className="flex justify-between items-center ">
            <span>
              <h3 className="md:text-2xl">Users List</h3>
            </span>
            <span>
              <Search
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </span>
          </div>
          {isLoading && <SpinnerImage />}

          <div className="p-[5px] w-full overflow-x-auto">
            {!isLoading && users.length === 0 ? (
              <p>
                <b>"Users Not Found, Please Add a Users"</b>
              </p>
            ) : (
              <table className="p-[5px] w-full overflow-x-auto">
                <thead className="border-t-[2px_solid_#1f93ff] border-b-[2px_solid_#1f93ff]">
                  <tr>
                    <th scope="col" className="align-top text-left p-[8px]">
                      s/n
                    </th>
                    <th scope="col" className="align-top text-left p-[8px]">
                      Name
                    </th>
                    <th scope="col" className="align-top text-left p-[8px]">
                      Email
                    </th>
                    <th scope="col" className="align-top text-left p-[8px]">
                      Role
                    </th>
                    <th scope="col" className="align-top text-left p-[8px]">
                      Change Role
                    </th>
                    <th scope="col" className="align-top text-left p-[8px]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((user, index) => {
                    const { _id, name, email, role } = user;
                    return (
                      <tr
                        key={_id}
                        className="hover:cursor-pointer hover:bg-[rgba(31,_147,_255,_0.3)]"
                      >
                        <td className="align-top text-left p-[8px]">
                          {index + 1}
                        </td>
                        <td className="align-top text-left p-[8px]">
                          {shortenText(name, 8)}
                        </td>
                        <td className="align-top text-left p-[8px]">{email}</td>
                        <td>{role}</td>
                        <td>
                          <ChangeRole _id={_id} />
                        </td>
                        <td className="flex justify-start items-center align-top text-left p-[8px] mr-[7px] cursor-pointer  self-center ">
                          <span>
                            <FaTrashAlt
                              size={20}
                              color={"red"}
                              onClick={() => confirmDelete(_id)}
                            />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
          {/* Paginate */}
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="Prev"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="active"
          />
        </div>
      </div>
    </div>
  );
};

export default UserList;

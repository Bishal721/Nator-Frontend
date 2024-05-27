import React, { useEffect, useState } from "react";
// import { AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import { SpinnerImage } from "../../../../components/loader/Loader";
import Search from "../../../components/search/Search";
import {
  FILTER_PACKAGES,
  selectFilteredPackage,
} from "../../../../redux/features/packages/FilterSlice";
import {
  deletePackage,
  getPackages,
} from "../../../../redux/features/packages/packageSlice";

const PackageList = ({ packages, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredPackages = useSelector(selectFilteredPackage);
  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const   delProduct = async (id) => {
    await dispatch(deletePackage(id));
    await dispatch(getPackages());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure to delete Product",
      buttons: [
        {
          label: "Delete",
          onClick: () => delProduct(id),
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
    setCurrentItems(filteredPackages.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredPackages.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredPackages]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredPackages.length;

    setItemOffset(newOffset);
  };

  //End Pagination

  useEffect(() => {
    dispatch(FILTER_PACKAGES({ packages, search }));
  }, [packages, search, dispatch]);
  return (
    <div className="text-[#333]">
      <hr />
      <div className="p-[5px] w-full overflow-x-auto">
        <div className="flex justify-between items-center ">
          <span>
            <h3 className="md:text-2xl">Package List</h3>
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
          {!isLoading && packages.length === 0 ? (
            <p>
              <b>"No Inventory Items Found, Please Add a Product"</b>
            </p>
          ) : (
            <table className="p-[5px] w-full overflow-x-auto">
              <thead className="border-t-[2px_solid_#1f93ff] border-b-[2px_solid_#1f93ff]">
                <tr>
                  <th scope="col" className="align-top text-left p-[8px]">
                    s/n
                  </th>
                  <th scope="col" className="align-top text-left p-[8px]">
                    name
                  </th>
                  <th scope="col" className="align-top text-left p-[8px]">
                    Location
                  </th>
                  <th scope="col" className="align-top text-left p-[8px]">
                    Price
                  </th>
                  <th scope="col" className="align-top text-left p-[8px]">
                    duration
                  </th>
                  <th scope="col" className="align-top text-left p-[8px]">
                    difficulty
                  </th>
                  <th scope="col" className="align-top text-left p-[8px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((pack, index) => {
                  const { _id, name, location, difficulty, duration, price } =
                    pack;
                  return (
                    <tr
                      key={_id}
                      className="hover:cursor-pointer hover:bg-[rgba(31,_147,_255,_0.3)]"
                    >
                      <td className="align-top text-left p-[8px]">
                        {index + 1}
                      </td>
                      <td className="align-top text-left p-[8px]">
                        {shortenText(name, 16)}
                      </td>
                      <td className="align-top text-left p-[8px]">
                        {location}
                      </td>
                      <td>
                        {"$ "}
                        {price}
                      </td>
                      <td>{`${duration} days`}</td>
                      <td>{difficulty}</td>
                      <td className="flex justify-start items-center align-top text-left p-[8px] mr-[7px] cursor-pointer  self-center ">
                        <span>
                          <Link to={`../edit-packages/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
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
  );
};

export default PackageList;

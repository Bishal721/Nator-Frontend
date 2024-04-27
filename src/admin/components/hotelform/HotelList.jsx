import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SpinnerImage } from "../../../components/loader/Loader";
import {
  deleteHotel,
  getAllHotels,
} from "../../../redux/features/hotels/hotelSlice";
import {
  FILTER_HOTELS,
  selectFilteredHotels,
} from "../../../redux/features/packages/FilterSlice";
import Search from "../search/Search";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
const initialState = {
  city: "",
  min: "",
  max: "",
};
const HotelList = ({ hotels, isLoading }) => {
  //   console.log(hotels);
  const [search, setSearch] = useState("");
  const filteredHotels = useSelector(selectFilteredHotels);
  const dispatch = useDispatch();

  const delProduct = async (id) => {
    await dispatch(deleteHotel(id));
    await dispatch(getAllHotels(initialState));
  };
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
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
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredHotels.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredHotels.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredHotels]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredHotels.length;

    setItemOffset(newOffset);
  };

  //End Pagination
  useEffect(() => {
    dispatch(FILTER_HOTELS({ hotels, search }));
  }, [hotels, search, dispatch]);

  return (
    <div className="text-[#333]">
      <hr />
      <div className="p-[5px] w-full overflow-x-auto">
        <div className="flex justify-between items-center ">
          <span>
            <h3 className="md:text-2xl">Hotels List</h3>
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
          {!isLoading && hotels.length === 0 ? (
            <p>
              <b>"No Inventory Items Found, Please Add Hotels"</b>
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
                    city
                  </th>
                  <th scope="col" className="align-top text-left p-[8px]">
                    Price
                  </th>
                  <th scope="col" className="align-top text-left p-[8px]">
                    address
                  </th>
                  <th scope="col" className="align-top text-left p-[8px]">
                    featured
                  </th>
                  <th scope="col" className="align-top text-left p-[8px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((pack, index) => {
                  const { _id, name, city, address, cheapestPrice, featured } =
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
                      <td className="align-top text-left p-[8px]">{city}</td>
                      <td>${cheapestPrice}</td>
                      <td>{address}</td>
                      <td>{featured === true ? "Yes" : "No"}</td>
                      <td className="flex justify-start items-center align-top text-left p-[8px] mr-[7px] cursor-pointer  self-center ">
                        <span>
                          <Link to={`../edit-hotels/${_id}`}>
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

export default HotelList;

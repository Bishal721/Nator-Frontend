import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-confirm-alert/src/react-confirm-alert.css";
import Search from "../../components/search/Search";
import { SpinnerImage } from "../../../components/loader/Loader";
import ReactPaginate from "react-paginate";
import {
  FILTER_HOTEL_RESERVE,
  selectFilteredHotelReserve,
} from "../../../redux/features/packages/FilterSlice";
import {
  RESETHOTELRESERVEARR,
  getAllHotelReservation,
} from "../../../redux/features/bookingdata/bookingdataSlice";

const ViewHotelReserve = () => {
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };
  const dispatch = useDispatch();
  const filteredHotelReserve = useSelector(selectFilteredHotelReserve);

  const { hotelreserve, isLoading, isError, message } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    dispatch(RESETHOTELRESERVEARR());
    dispatch(getAllHotelReservation());

    if (isError) {
      console.log(message);
    }
  }, [dispatch, message, isError]);
  const [search, setSearch] = useState("");

  //Begin Pagination

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredHotelReserve.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredHotelReserve.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredHotelReserve]);
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % filteredHotelReserve.length;

    setItemOffset(newOffset);
  };
  useEffect(() => {
    dispatch(FILTER_HOTEL_RESERVE({ hotelreserve, search }));
  }, [hotelreserve, search, dispatch]);

  return (
    <div className="p-1 w-full overflow-x-auto">
      <div className="flex justify-between items-center ">
        <span>
          <h3 className="md:text-2xl">Hotel Reserve List</h3>
        </span>
        <span>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </span>
      </div>
      {isLoading && <SpinnerImage />}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {!isLoading && hotelreserve.length === 0 ? (
          <p>
            <b>"Bookings not Found"</b>
          </p>
        ) : (
          <table className="w-full  overflow-x-auto">
            <thead className="bg-orange-400 text-white w-full">
              <tr>
                <th scope="col" className="align-top text-left p-3">
                  {shortenText("Hotel Name", 20)}
                </th>
                <th scope="col" className="align-top text-left p-3">
                  Hotel City
                </th>
                <th scope="col" className="align-top text-left p-3">
                  Hotel Distance
                </th>
                <th scope="col" className="align-top text-left p-3">
                  Booked By
                </th>
                <th scope="col" className="align-top text-left p-3">
                  Email
                </th>
                <th scope="col" className="align-top text-left p-3">
                  Reserve Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((book) => {
                return (
                  <tr
                    key={book._id}
                    className="hover:cursor-pointer hover:bg-[rgba(31,_147,_255,_0.3)] capitalize"
                  >
                    <td className="align-top text-left p-3">
                      {shortenText(book?.hotelId.name, 10)}
                    </td>
                    <td className="align-top text-left p-3">
                      {shortenText(book?.hotelId.city, 10)}
                    </td>
                    <td className="align-top text-left p-3">
                      {shortenText(book?.hotelId.distance, 10)}&nbsp;days
                    </td>
                    <td className="align-top text-left p-3">
                      {shortenText(book?.userId.name, 10)}
                    </td>
                    <td className="align-top text-left p-3 normal-case">
                      {shortenText(book?.userId.email, 10)}
                    </td>
                    <td className="align-top text-left p-3">
                      {shortenText(book?.status, 10)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
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

export default ViewHotelReserve;

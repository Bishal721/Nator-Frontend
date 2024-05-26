import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CancelBooking,
  RESETBOOKINGARR,
  getSingleBooking,
} from "../../redux/features/bookingdata/bookingdataSlice";
import Search from "../../admin/components/search/Search";
import { SpinnerImage } from "../../components/loader/Loader";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import ReactPaginate from "react-paginate";
import {
  FILTER_BOOKINGS,
  selectFilteredBookings,
} from "../../redux/features/packages/FilterSlice";
import CustomBookingPage from "./CustomBookingPage";
import HotelReserve from "./HotelReserve";
const BookingPage = () => {
  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const dispatch = useDispatch();
  const filteredBookings = useSelector(selectFilteredBookings);

  const { bookings, isLoading, isError, message } = useSelector(
    (state) => state.booking
  );
  useEffect(() => {
    dispatch(RESETBOOKINGARR());
    dispatch(getSingleBooking());

    if (isError) {
      console.log(message);
    }
  }, [dispatch, message, isError]);
  const [search, setSearch] = useState("");

  const cancelbookingPack = async (id) => {
    await dispatch(CancelBooking(id));
    await dispatch(getSingleBooking());
  };
  const confirmCancel = (id) => {
    confirmAlert({
      title: "Cancel Booking",
      message: "Are you sure to Cancel Booking",
      buttons: [
        {
          label: "Yes",
          onClick: () => cancelbookingPack(id),
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  //Begin Pagination

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredBookings.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredBookings.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredBookings]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredPackages.length;

    setItemOffset(newOffset);
  };
  useEffect(() => {
    dispatch(FILTER_BOOKINGS({ bookings, search }));
  }, [bookings, search, dispatch]);
  return (
    <>
      <div className="p-1 w-full overflow-x-auto">
        <div className="flex justify-between items-center ">
          <span>
            <h3 className="md:text-2xl">Package Bookings List</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>
        {isLoading && <SpinnerImage />}

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {!isLoading && bookings.length === 0 ? (
            <p>
              <b>"Bookings not Found"</b>
            </p>
          ) : (
            <table className="w-full  overflow-x-auto">
              <thead className="bg-orange-400 text-white w-full">
                <tr>
                  <th scope="col" className="align-top text-left p-3">
                    {shortenText("Package Name", 20)}
                  </th>
                  <th scope="col" className="align-top text-left p-3">
                    Package Location
                  </th>
                  <th scope="col" className="align-top text-left p-3">
                    Package Duration
                  </th>
                  <th scope="col" className="align-top text-left p-3">
                    Booked By
                  </th>
                  <th scope="col" className="align-top text-left p-3">
                    Price
                  </th>
                  <th scope="col" className="align-top text-left p-3">
                    No of Guests
                  </th>
                  <th scope="col" className="align-top text-left p-3">
                    Booking Status
                  </th>
                  <th scope="col" className="align-top text-left p-3">
                    Action
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
                        {shortenText(book?.packageId.name, 10)}
                      </td>
                      <td className="align-top text-left p-3">
                        {shortenText(book?.packageId.location, 10)}
                      </td>
                      <td className="align-top text-left p-3">
                        {shortenText(book?.packageId.duration, 10)}&nbsp;days
                      </td>
                      <td className="align-top text-left p-3">
                        {shortenText(book?.userId.name, 10)}
                      </td>
                      <td className="align-top text-left p-3">
                        Rs&nbsp;{shortenText(book?.price, 10)}
                      </td>
                      <td className="align-top text-left p-3">
                        {shortenText(book?.guests, 10)}
                      </td>
                      <td className="align-top text-left p-3">
                        {shortenText(book?.status, 10)}
                      </td>
                      <td className="align-top text-left p-3">
                        <button
                          className="font-medium bg-orange-400 hover:bg-orange-500 p-2 rounded text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
                          onClick={() => confirmCancel(book?._id)}
                          disabled={book?.status === "Canceled"}
                        >
                          Cancel Booking
                        </button>
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
      <CustomBookingPage />
      <HotelReserve />
    </>
  );
};

export default BookingPage;

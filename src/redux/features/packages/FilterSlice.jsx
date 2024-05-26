import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredPackages: [],
  filteredHotels: [],
  filteredUsers: [],
  filteredBookings: [],
  filteredCustomBookings: [],
  filteredHotelReserve: [],
};

const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_PACKAGES(state, action) {
      const { packages, search } = action.payload;
      const tempPackages = packages.filter(
        (pack) =>
          pack.name.toLowerCase().includes(search.toLowerCase()) ||
          pack.location.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredPackages = tempPackages;
    },
    FILTER_HOTELS(state, action) {
      const { hotels, search } = action.payload;
      const tempHotels = hotels.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(search.toLowerCase()) ||
          hotel.city.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredHotels = tempHotels;
    },
    FILTER_USERS(state, action) {
      const { users, search } = action.payload;
      const tempuser = users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredUsers = tempuser;
    },
    FILTER_BOOKINGS(state, action) {
      const { bookings, search } = action.payload;
      const tempBooking = bookings.filter(
        (book) =>
          book.packageId.location
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          book.packageId.name.toLowerCase().includes(search.toLowerCase()) ||
          book.userId.name.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredBookings = tempBooking;
    },
    FILTER_CUSTOM_BOOKINGS(state, action) {
      const { custombookings, search } = action.payload;
      const tempBooking = custombookings.filter(
        (book) =>
          book.packageId.location
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          book.packageId.name.toLowerCase().includes(search.toLowerCase()) ||
          book.userId.name.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredCustomBookings = tempBooking;
    },
    FILTER_HOTEL_RESERVE(state, action) {
      const { hotelreserve, search } = action.payload;
      const tempBooking = hotelreserve.filter(
        (book) =>
          book.hotelId.city.toLowerCase().includes(search.toLowerCase()) ||
          book.hotelId.name.toLowerCase().includes(search.toLowerCase()) ||
          book.userId.name.toLowerCase().includes(search.toLowerCase())
      );
      state.filteredHotelReserve = tempBooking;
    },
  },
});

export const {
  FILTER_PACKAGES,
  FILTER_HOTELS,
  FILTER_USERS,
  FILTER_BOOKINGS,
  FILTER_CUSTOM_BOOKINGS,
  FILTER_HOTEL_RESERVE,
} = FilterSlice.actions;

export const selectFilteredPackage = (state) => state.filter.filteredPackages;
export const selectFilteredHotels = (state) => state.filter.filteredHotels;

export const selectFilteredUsers = (state) => state.filter.filteredUsers;
export const selectFilteredBookings = (state) => state.filter.filteredBookings;
export const selectFilteredCustomBookings = (state) =>
  state.filter.filteredCustomBookings;
export const selectFilteredHotelReserve = (state) =>
  state.filter.filteredHotelReserve;

export default FilterSlice.reducer;

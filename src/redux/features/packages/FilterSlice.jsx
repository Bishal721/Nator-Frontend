import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredPackages: [],
  filteredHotels: [],
  filteredUsers: [],
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
  },
});

export const { FILTER_PACKAGES, FILTER_HOTELS, FILTER_USERS } =
  FilterSlice.actions;

export const selectFilteredPackage = (state) => state.filter.filteredPackages;
export const selectFilteredHotels = (state) => state.filter.filteredHotels;

export const selectFilteredUsers = (state) => state.filter.filteredUsers;

export default FilterSlice.reducer;

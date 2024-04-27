import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredPackages: [],
  filteredHotels: [],
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
  },
});

export const { FILTER_PACKAGES, FILTER_HOTELS } = FilterSlice.actions;

export const selectFilteredPackage = (state) => state.filter.filteredPackages;
export const selectFilteredHotels = (state) => state.filter.filteredHotels;

export default FilterSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredPackages: [],
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
  },
});

export const { FILTER_PACKAGES } = FilterSlice.actions;

export const selectFilteredPackage = (state) => state.filter.filteredPackages;

export default FilterSlice.reducer;

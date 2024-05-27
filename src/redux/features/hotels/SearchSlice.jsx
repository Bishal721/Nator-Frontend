import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
  location: null,
};
const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    NewSearch: (state, action) => {
      return action.payload;
    },
    NewHomeSearch: (state, action) => {
      state.location = action.payload;
    },
    resetSearch: () => {
      return {
        city: undefined,
        dates: [],
        options: {
          adult: undefined,
          children: undefined,
          room: undefined,
        },
      };
    },
  },
});

export const { NewSearch, NewHomeSearch } = SearchSlice.actions;
export default SearchSlice.reducer;

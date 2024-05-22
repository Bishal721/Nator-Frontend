import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import packageService from "../packages/pacakgeService";

const initialState = {
  bookingFormData: null,
  bookings: [],
};

// Action creator to store booking form data
export const storeBookingFormData = createAsyncThunk(
  "booking/storeBookingFormData",
  async (formData, thunkAPI) => {
    console.log(formData);
    try {
      // Dispatch an action to update the state with the booking form data
      return formData;
    } catch (error) {
      console.error("Error storing booking form data:", error);
      // Return error message to be handled by Redux
      return thunkAPI.rejectWithValue("Error storing booking form data.");
    }
  }
);

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (formData, thunkAPI) => {
    console.log(formData);
    try {
      return await packageService.createBooking(formData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      toast.error(error.response.data.message);
      console.log(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const bookingdataSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    RESETBOOKING(state) {
      state.bookingFormData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle storeBookingFormData pending action
      .addCase(storeBookingFormData.pending, (state) => {
        state.isLoading = true;
      })
      // Handle storeBookingFormData fulfilled action
      .addCase(storeBookingFormData.fulfilled, (state, action) => {
        state.bookingFormData = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
        toast.success("Booking form data stored successfully");
      })
      // Handle storeBookingFormData rejected action
      .addCase(storeBookingFormData.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.bookings.push(action.payload);
        toast.success("Package Booked successfully");
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { RESETBOOKING } = bookingdataSlice.actions;

export const selectBookingFormData = (state) => state.booking.bookingFormData;

export default bookingdataSlice.reducer;

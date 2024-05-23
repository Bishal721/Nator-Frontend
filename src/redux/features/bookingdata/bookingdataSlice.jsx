import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import packageService from "../packages/pacakgeService";

const initialState = {
  bookingFormData: null,
  bookings: [],
  Booking: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
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

export const getSingleBooking = createAsyncThunk(
  "booking/getSingleBooking",
  async (_, thunkAPI) => {
    try {
      return await packageService.getSingleBooking();
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

export const getAllBookings = createAsyncThunk(
  "booking/getAllBookings",
  async (_, thunkAPI) => {
    try {
      return await packageService.getAllBookings();
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

export const CancelBooking = createAsyncThunk(
  "booking/cancelBooking",
  async (id, thunkAPI) => {
    try {
      return await packageService.CancelBooking(id);
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
    RESETBOOKINGARR(state) {
      state.bookings = [];
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
      })
      .addCase(getSingleBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.bookings = action.payload;
      })
      .addCase(getSingleBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.bookings = action.payload;
      })
      .addCase(getAllBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      }) // Delete Packages
      .addCase(CancelBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CancelBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Booking canceled Successfully");
        toast.info("Your Money will be returned with in a week");
      })
      .addCase(CancelBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});
export const { RESETBOOKING, RESETBOOKINGARR } = bookingdataSlice.actions;

export const selectBookingFormData = (state) => state.booking.bookingFormData;

export default bookingdataSlice.reducer;

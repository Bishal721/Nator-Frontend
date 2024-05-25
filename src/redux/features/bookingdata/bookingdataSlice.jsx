import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import packageService from "../packages/pacakgeService";

const initialState = {
  bookingFormData: null,
  bookings: [],
  custombookings: [],
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

export const createCustomBooking = createAsyncThunk(
  "booking/createCustomBooking",
  async (formData, thunkAPI) => {
    console.log(formData);
    try {
      return await packageService.createCustomBooking(formData);
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

export const getSingleCustomBooking = createAsyncThunk(
  "booking/getSingleCustomBooking",
  async (_, thunkAPI) => {
    try {
      return await packageService.getSingleCustomBooking();
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

export const getAllCustomBookings = createAsyncThunk(
  "booking/getAllCustomBookings",
  async (_, thunkAPI) => {
    try {
      return await packageService.getAllCustomBookings();
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

export const CancelCustomBooking = createAsyncThunk(
  "booking/cancelCustomBooking",
  async (id, thunkAPI) => {
    try {
      return await packageService.CancelCustomBooking(id);
      re;
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
    RESETCUSTOMBOOKINGARR(state) {
      state.custombookings = [];
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
      })
      .addCase(createCustomBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCustomBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.bookings.push(action.payload);
        toast.success("Custom Package Booked successfully");
      })
      .addCase(createCustomBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
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
      .addCase(CancelCustomBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CancelCustomBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Custom Booking canceled Successfully");
        toast.info("Your Money will be returned with in a week");
      })
      .addCase(CancelCustomBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getSingleCustomBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleCustomBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.custombookings = action.payload;
      })
      .addCase(getSingleCustomBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllCustomBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCustomBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.custombookings = action.payload;
      })
      .addCase(getAllCustomBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { RESETBOOKING, RESETBOOKINGARR, RESETCUSTOMBOOKINGARR } =
  bookingdataSlice.actions;

export const selectBookingFormData = (state) => state.booking.bookingFormData;

export default bookingdataSlice.reducer;

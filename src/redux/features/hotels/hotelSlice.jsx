import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import hotelService from "./hotelServices";
import { toast } from "react-toastify";

const initialState = {
  Hotel: null,
  hotels: [],
  hotelrooms: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create Hotels
export const createHotel = createAsyncThunk(
  "hotels/create",
  async (formData, thunkAPI) => {
    try {
 
      return await hotelService.createHotel(formData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      console.log(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get all Hotels
export const getAllHotels = createAsyncThunk(
  "hotels/getAll",
  async (formData, thunkAPI) => {
    try {
      return await hotelService.getAllHotels(formData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      console.log(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getHotel = createAsyncThunk(
  "hotels/getHotel",
  async (id, thunkAPI) => {
    try {
      return await hotelService.getHotel(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update a  Hotel
export const updateHotel = createAsyncThunk(
  "hotels/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await hotelService.updateHotel(id, formData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a Hotel
export const deleteHotel = createAsyncThunk(
  "hotels/delete",
  async (id, thunkAPI) => {
    try {
      return await hotelService.deleteHotel(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      console.log(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getHotelRooms = createAsyncThunk(
  "hotels/getRoom",
  async (id, thunkAPI) => {
    try {
      return await hotelService.getHotelRooms(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      console.log(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createHotel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createHotel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.hotels.push(action.payload);
        toast.success("Hotel added successfully");
      })
      .addCase(createHotel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      }) // get all Hotels
      .addCase(getAllHotels.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllHotels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.hotels = action.payload;
      })
      .addCase(getAllHotels.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      }) //Get Hotel
      .addCase(getHotel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHotel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Hotel = action.payload;
      })
      .addCase(getHotel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      }) //Update Hotels
      .addCase(updateHotel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateHotel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Hotel Updated Successfully");
      })
      .addCase(updateHotel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      //    Delete Hotels
      .addCase(deleteHotel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteHotel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.hotels = state.hotels.filter(
          (Hotel) => Hotel._id !== action.payload
        );
        toast.success("Hotel Deleted Successfully");
      })
      .addCase(deleteHotel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      }) // Get  Hotel Rooms
      .addCase(getHotelRooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHotelRooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.hotelrooms = action.payload;
      })
      .addCase(getHotelRooms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {} = hotelSlice.actions;
export const selectIsLoading = (state) => state.hotel.isLoading;
export const selectHotel = (state) => state.hotel.Hotel;
export default hotelSlice.reducer;

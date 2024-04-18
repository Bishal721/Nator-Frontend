import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import roomService from "./roomServices";

const initialState = {
  Room: null,
  rooms: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const createRoom = createAsyncThunk(
  "rooms/create",
  async (formData, thunkAPI) => {
    try {
      return await roomService.createRoom(formData);
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

export const updateRoomAvailability = createAsyncThunk(
  "rooms/Availability",
  async ({ id, formData }, thunkAPI) => {
    try {
      const data = await roomService.updateRoomAvailability(id, formData);
      console.log("data", data);
      return data;
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
const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //create Room
      .addCase(createRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.hotels.push(action.payload);
        toast.success("Hotel added successfully");
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      //UpdateAvailability Room
      .addCase(updateRoomAvailability.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRoomAvailability.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Room Booked Successfully");
      })
      .addCase(updateRoomAvailability.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {} = roomSlice.actions;
export const selectRoom = (state) => state.room.Room;
export default roomSlice.reducer;

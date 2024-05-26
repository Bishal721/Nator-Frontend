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

export const updateRoom = createAsyncThunk(
  "rooms/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const data = await roomService.updateRoom(id, formData);
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

export const deleteRoom = createAsyncThunk(
  "rooms/delete",
  async ({ id, HotelId }, thunkAPI) => {
    try {
      const data = await roomService.deleteRoom(id, HotelId);
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

export const getRoom = createAsyncThunk(
  "rooms/getRoom",
  async (id, thunkAPI) => {
    try {
      return await roomService.getRoom(id);
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

export const getAllRooms = createAsyncThunk(
  "rooms/getAll",
  async (_, thunkAPI) => {
    try {
      return await roomService.getAllRooms();
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
      })
      //Update Package
      .addCase(updateRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Room Updated Successfully");
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      }) // Delete Room
      .addCase(deleteRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.rooms = state.rooms.filter((Room) => Room._id !== action.payload);
        toast.success("Room Deleted Successfully");
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      }) //get Room
      .addCase(getRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Room = action.payload;
      })
      .addCase(getRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      }) // get all Rooms
      .addCase(getAllRooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.rooms = action.payload;
      })
      .addCase(getAllRooms.rejected, (state, action) => {
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

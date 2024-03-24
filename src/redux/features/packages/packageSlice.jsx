import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import packageService from "./pacakgeService";
import { toast } from "react-toastify";

const initialState = {
  Package: null,
  packages: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
// Create Packages
export const createPackage = createAsyncThunk(
  "packages/create",
  async (formData, thunkAPI) => {
    try {
      return await packageService.createPackage(formData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get all packages
export const getPackages = createAsyncThunk(
  "packages/getAll",
  async (_, thunkAPI) => {
    try {
      return await packageService.getPackages();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPackage = createAsyncThunk(
  "packages/getPackage",
  async (id, thunkAPI) => {
    try {
      return await packageService.getPackage(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPackage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPackage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.packages.push(action.payload);
        toast.success("product added successfully");
      })
      .addCase(createPackage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      }) // get all packages
      .addCase(getPackages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPackages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.packages = action.payload;
      })
      .addCase(getPackages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      }) //Get Product
      .addCase(getPackage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPackage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Package = action.payload;
      })
      .addCase(getPackage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {} = packageSlice.actions;

export default packageSlice.reducer;

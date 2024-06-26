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
  maxExtraPeople: null,
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
      console.log(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get all packages
export const getPackages = createAsyncThunk(
  "packages/getAll",
  async (formData, thunkAPI) => {
    try {
      if (formData === undefined) {
        return await packageService.getPackages();
      }
      return await packageService.getPackages(formData);
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
export const getExtraPeople = createAsyncThunk(
  "packages/getextrapeople",
  async (_, thunkAPI) => {
    try {
      return await packageService.getExtraPeople();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update a  Package
export const updatePackage = createAsyncThunk(
  "packages/updatePackage",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await packageService.updatePackage(id, formData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a Package
export const deletePackage = createAsyncThunk(
  "packages/delete",
  async (id, thunkAPI) => {
    try {
      return await packageService.deletePackage(id);
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

export const getFivePackages = createAsyncThunk(
  "packages/getFivePackages",
  async (_, thunkAPI) => {
    try {
      return await packageService.getFivePackages();
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

export const createReview = createAsyncThunk(
  "packages/createReview",
  async (formData, thunkAPI) => {
    try {
      return await packageService.createReview(formData);
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
        toast.success("Package added successfully");
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
      }) //Get Package
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
      })
      //Update Package
      .addCase(updatePackage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePackage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Package Updated Successfully");
      })
      .addCase(updatePackage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // Delete Packages
      .addCase(deletePackage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePackage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.packages = state.packages.filter(
          (Package) => Package._id !== action.payload
        );
        toast.success("Package Deleted Successfully");
      })
      .addCase(deletePackage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      }) // get five packages
      .addCase(getFivePackages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFivePackages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.packages = action.payload;
      })
      .addCase(getFivePackages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(createReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.packages.push(action.payload);
        toast.success("Review added successfully");
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getExtraPeople.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExtraPeople.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.maxExtraPeople = action.payload;
      })
      .addCase(getExtraPeople.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {} = packageSlice.actions;
export const selectIsLoading = (state) => state.package.isLoading;
export const selectPackage = (state) => state.package.Package;
export default packageSlice.reducer;

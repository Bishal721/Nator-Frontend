import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import packageReducer from "./features/packages/packageSlice";
import filterReducer from "./features/packages/FilterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    package: packageReducer,
    filter: filterReducer,
  },
});

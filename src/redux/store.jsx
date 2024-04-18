import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import packageReducer from "./features/packages/packageSlice";
import filterReducer from "./features/packages/FilterSlice";
import hotelReducer from "./features/hotels/hotelSlice";
import SearchReducer from "./features/hotels/SearchSlice";
import roomReducer from "./features/rooms/roomSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    package: packageReducer,
    filter: filterReducer,
    hotel: hotelReducer,
    search: SearchReducer,
    room: roomReducer,
  },
});

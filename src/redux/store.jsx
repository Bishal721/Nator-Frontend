import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/auth/authSlice";
import packageReducer from "./features/packages/packageSlice";
import filterReducer from "./features/packages/FilterSlice";
import hotelReducer from "./features/hotels/hotelSlice";
import SearchReducer from "./features/hotels/SearchSlice";
import roomReducer from "./features/rooms/roomSlice";
import bookingReducer from "./features/bookingdata/bookingdataSlice";
const persistConfig = {
  key: "root",
  storage,
};

const persistedBookingReducer = persistReducer(persistConfig, bookingReducer);

const store = configureStore({
  reducer: {
    auth: authReducer,
    package: packageReducer,
    filter: filterReducer,
    hotel: hotelReducer,
    search: SearchReducer,
    room: roomReducer,
    booking: persistedBookingReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };

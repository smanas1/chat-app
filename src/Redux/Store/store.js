import authSlice from "../Slice/LoginSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    login: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

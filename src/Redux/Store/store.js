import authSlice from "../Slice/LoginSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    login: authSlice,
  },
});

export default store;

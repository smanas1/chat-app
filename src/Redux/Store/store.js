import authSlice from "../Slice/LoginSlice";
import { configureStore } from "@reduxjs/toolkit";
import ActiveChatSlice from "../Slice/ActiveChatSlice";
const store = configureStore({
  reducer: {
    login: authSlice,
    ActiveChat: ActiveChatSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

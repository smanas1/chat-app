import { createSlice } from "@reduxjs/toolkit";

export const ActiveChatSlice = createSlice({
  name: "Single",
  initialState: {
    active: localStorage.getItem("activeSingle")
      ? JSON.parse(localStorage.getItem("activeSingle"))
      : null,
  },
  reducers: {
    ActiveChat: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { ActiveChat } = ActiveChatSlice.actions;
export default ActiveChatSlice.reducer;

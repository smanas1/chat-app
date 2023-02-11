import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "Login",
  initialState: {
    loggedin: localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : null,
  },
  reducers: {
    Loginuser: (state, action) => {
      state.loggedin = action.payload;
    },
  },
});

export const { Loginuser } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { currUser: null, error: null },
  reducers: {
    signInSuccess: (state, action) => {
      state.currUser = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { signInSuccess, signInFailure } = userSlice.actions;

export default userSlice.reducer;
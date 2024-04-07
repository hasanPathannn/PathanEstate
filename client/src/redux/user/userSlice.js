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
    updateUserSuccess: (state, action) => {
      state.currUser = action.payload;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
    },
    userDeleteSuccess: (state, action) => {
      state.currUser = null;
      state.err = null;
    },
    userDeleteFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  signInSuccess,
  signInFailure,
  updateUserFailure,
  updateUserSuccess,
  userDeleteSuccess,
  userDeleteFailure,
} = userSlice.actions;

export default userSlice.reducer;

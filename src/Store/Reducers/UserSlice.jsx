import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    Userloading: (state, action) => {
      state.users = action.payload;
    },
    UserLogOut: (state, action) => {
      state.users = null;
    },
  },
});

export default userSlice.reducer;
export const { Userloading, UserLogOut } = userSlice.actions;

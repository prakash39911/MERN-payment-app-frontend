import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [
    {
      isAuthenticated: "false",
      firstname: "ram",
      lastname: "shyam",
      email: "hello@hello.com",
      _id: "823682",
    },
  ],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    storeCurrentUser: (state, action) => {
      state.user = [];
      action.payload.isAuthenticated = true;
      state.user.push(action.payload);
    },

    removeCurrentUser: (state, action) => {
      state.user = [{ isAuthenticated: false }];
    },
  },
});

export const { storeCurrentUser, removeCurrentUser } = userSlice.actions;

export default userSlice.reducer;

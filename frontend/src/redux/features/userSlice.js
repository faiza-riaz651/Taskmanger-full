import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};
const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    saveUserInfo: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },

    removeUserInfo: (state, action) => {
      localStorage.removeItem("user");
      state.user = null;
    },
  },
});

export const { saveUserInfo, removeUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = { prevPath: "", currPath: "" };
const pathSlice = createSlice({
  name: "pathSlice",
  initialState,
  reducers: {
    prevPath: (state, action) => {
      state.prevPath = state.currPath;
      state.currPath = action.payload;
    },
  },
});

export const { prevPath } = pathSlice.actions;
export default pathSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import userInfoReducer from "./features/userSlice.js";
import pathSliceReducer from "./features/pathSlice.js";

const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    prevPathInfo: pathSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export { store };

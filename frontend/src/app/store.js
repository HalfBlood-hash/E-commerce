import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../featrure/auth/authslice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
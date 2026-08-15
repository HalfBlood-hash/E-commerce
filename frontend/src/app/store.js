import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../featrure/auth/authslice";
import productReducer from "../featrure/product/productslice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});

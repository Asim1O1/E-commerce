import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice.jsx";
import productSlice from "../features/products/productSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
  },
});

export default store;

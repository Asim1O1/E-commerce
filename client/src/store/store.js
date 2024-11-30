import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice.jsx";
import productSlice from "../features/products/productSlice";
import cartSlice from "../features/cart/cartSlice.js"

const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    cart: cartSlice
  },
});

export default store;

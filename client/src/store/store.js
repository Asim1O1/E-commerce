import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice.jsx";
import productSlice from "../features/products/productSlice";
import cartSlice from "../features/cart/cartSlice.js"
import orderSlice from "../features/orders/orderSlice.js"

const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    cart: cartSlice,
    order: orderSlice
  },
});

export default store;

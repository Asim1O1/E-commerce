import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCartService,
  removeFromCartService,
  updateCartService,
} from "../../services/cartService";
import cartService from "../../services/cartService";


// Async thunks for cart operations

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, { getState, rejectWithValue }) => {
    console.log("The product id and quantity is:::", productId, quantity);
    const userId = getState().auth.user?._id;

    if (!userId) {
      throw new Error("User not logged in");
    }

    console.log("The user id while adding to cart", userId);
    try {
      const response = await cartService.addToCartService({
        userId,
        productId,
        quantity,
      });
      console.log("The response while adding to cart", response);
      return response?.data;
    } catch (error) {
      console.error("Error adding to cart:", error.message);

      return rejectWithValue(error.message);
    }
  }
);

// Get Cart
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { getState, rejectWithValue }) => {
    const userId = getState()?.auth;
    console.log("The user id while getting", userId);
    if (!userId) {
      throw new Error("User not logged in");
    }

    try {
      console.log("ENTERED THE THUNK FOR GET SINGLR CART");
      const response = await getCartService(userId);
      console.log("Cart retrieved:", response);
      return response;
    } catch (error) {
      console.error("Error fetching cart:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Remove from Cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    console.log("The prodyuct id in the cart in cart slice is ", productId);
    try {
      const response = await removeFromCartService(productId);
      console.log("Product removed from cart:", response);
      return { productId, data: response?.data };
    } catch (error) {
      console.error("Error removing from cart:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Update Cart
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      console.log("The product Id and the quantity is", productId, quantity);
      const response = await updateCartService(productId, quantity);
      console.log("Cart updated:", response);
      return { productId, quantity, data: response?.data };
    } catch (error) {
      console.error("Error updating cart:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Initial State
const initialState = {
  cart: null,
  loading: false,
  error: null,
};

// Cart Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartState: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    // Add to Cart
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Product added to cart successfully!";
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        console.log(
          "THE ACTION PAYLOAD IN GET CART IS REJECTED",
          action.payload
        );
        state.loading = false;
        state.error = action.payload;
      });

    // Get Cart
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        console.log("THE ACTION PAYLOAD IN GET CART IS", action.payload);
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Remove from Cart
    builder
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Product removed from cart successfully!";
        state.cart.products = state.cart.products.filter(
          (product) => product.productId._id !== action.payload.productId
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update Cart
    builder
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Cart updated successfully!";
        const productToUpdate = state.cart.products.find(
          (product) => product.productId._id === action.payload.productId
        );
        if (productToUpdate) {
          productToUpdate.quantity = action.payload.quantity;
        }
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export Reducer and Actions
export const { clearCartState } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCartService,
  getCartService,
  removeFromCartService,
  updateCartService,
} from "../../services/cartService";

// Async thunks for cart operations

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await addToCartService(productId, quantity);
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
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCartService();
      console.log("Cart retrieved:", response);
      return response?.data;
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
  successMessage: null,
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
        state.successMessage = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Product added to cart successfully!";
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
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

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "../../services/orderService";

// Async thunk for creating an order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ orderDetails }, { rejectWithValue }) => {
    try {
      // Call the service to create the order
      const response = await orderService.createOrderService(orderDetails);
      return response; // Return the API response
    } catch (error) {
      return rejectWithValue(error.message); // Handle and return formatted error
    }
  }
);

// Slice for managing order state
const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null, // Store the created order details
    isLoading: false, // Loading state
    error: null, // Error state
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Reset errors
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        console.log("The data in the cretae order ", action.payload);
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Capture error message
      });
  },
});

export default orderSlice.reducer;

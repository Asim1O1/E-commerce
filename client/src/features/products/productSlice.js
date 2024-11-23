import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService, {
  getAllProductService,
} from "../../services/productService";

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await productService.addProduct(productData);
      console.log("The response in the product slice is", response);
      return response?.data;
    } catch (error) {
      console.log("The response from the createProduct thunk is", error);
      return rejectWithValue(error || "Add product failed");
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "products/fetchAll",
  async ({ page, limit, category }, { rejectWithValue }) => {
    try {
      const response = await getAllProductService(page, limit, category);
      console.log("Fetched products:", response);

      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        console.log(
          "The action payload in the createProduct is",
          action.payload
        );
        state.loading = false;

        state.products = action.payload.IsSuccess
          ? action?.payload?.Result?.product_data
          : null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
    // .addCase(getAllProductService.fulfilled, (state, action) => {
    //   console.log("Fetched products:", action.payload);
    //   state.loading = false;
    //   state.products = action.payload
    // })
    // .addCase(getAllProductService.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload; // Store the error message in the state
    // });
  },
});

export default productSlice.reducer;

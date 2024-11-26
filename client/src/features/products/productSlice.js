import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService, {
  deleteSingleProductService,
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
      console.log("ENTERED THE GET ALL PRODUCTS THUNK API");
      const response = await getAllProductService(page, limit, category);
      console.log("Fetched products:", response);

      return response?.Result;
    } catch (error) {
      console.error("Error fetching products:", error);
      return rejectWithValue(error);
    }
  }
);

export const deleteSingleProduct = createAsyncThunk(
  "products/deleteSingleProduct", // The action type
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteSingleProductService(id);
      console.log("The response while deleting product is", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete product");
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

      // FOR CREATE PRODUCT
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

      // FOR GET ALL PRODUCTS
      .addCase(getAllProducts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        console.log("Fetched products:", action);
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;

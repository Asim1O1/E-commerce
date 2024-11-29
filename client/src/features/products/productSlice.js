import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService, {
  deleteSingleProductService,
  getAllProductService,
  getSingleProductService,
  updateProductsService,
} from "../../services/productService";

// Thunks for each product operation

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

export const getSingleProduct = createAsyncThunk(
  "products/fetchSingle",
  async ({ id }, { rejectWithValue }) => {
    try {
      console.log("ENTERED THE GET SINGLE PRODUCT THUNK API");
      const response = await getSingleProductService(id);
      console.log("Fetched product:", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      return rejectWithValue(error);
    }
  }
);

export const deleteSingleProduct = createAsyncThunk(
  "products/deleteSingleProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteSingleProductService(id);
      console.log("The response while deleting product is", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error || "Failed to delete product");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ productId, newProductData }, { rejectWithValue }) => {
    console.log(
      "Received data in updateProduct thunk:",
      productId,
      newProductData
    );

    try {
      const response = await updateProductsService(productId, newProductData);
      console.log("Response from update service:", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error || "Failed to update product");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [], // List of products for getAllProducts
    product: null, // Single product fetched by getSingleProduct
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE PRODUCT
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.IsSuccess
          ? action?.payload?.Result?.product_data
          : [];
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ALL PRODUCTS
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload || [];
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET SINGLE PRODUCT
      .addCase(getSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        console.log("The action payload is", action.payload);
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch product";
      })

      // DELETE SINGLE PRODUCT
      .addCase(deleteSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
      })
      .addCase(deleteSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE PRODUCT
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload.Result.product_data;
        state.loading = false;
        state.products = state.products.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;

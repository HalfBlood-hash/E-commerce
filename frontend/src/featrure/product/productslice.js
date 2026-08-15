import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productAPI from "../../services/productApi";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, thunkAPI) => {
    try {
      const response = await productAPI.get("/products");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || {
        message: error.message
      });
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData, thunkAPI) => {
    try {
      const response = await productAPI.post("/products", productData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || {
        message: error.message
      });
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data || [];
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Unable to load products";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload.data);
      });
  }
});

export default productSlice.reducer;

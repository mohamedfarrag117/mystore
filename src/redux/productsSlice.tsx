import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { Product, ProductsState } from "../types";

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/getProducts",
  async () => {
    const res = await axios.get("https://dummyjson.com/products");
    return res.data.products;
  },
);

const initialState: ProductsState = {
  productsList: [],
  loading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.productsList = action.payload;
      },
    );

    builder.addCase(fetchProducts.rejected, (state) => {
      state.loading = false;
      console.log("Failed to fetch the products");
    });
  },
});

export default productsSlice.reducer;

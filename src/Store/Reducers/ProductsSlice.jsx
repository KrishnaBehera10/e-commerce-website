import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsLoader: (state, action) => {
      state.products = action.payload;
    },
  },
});

export default productSlice.reducer;
export const { productsLoader } = productSlice.actions;

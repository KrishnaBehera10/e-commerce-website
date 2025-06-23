import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Reducers/UserSlice";
import productSlice from "./Reducers/ProductsSlice";

const store = configureStore({
  reducer: {
    userReducer: userSlice,
    productReducer: productSlice,
  },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  error: <any>"",
  productdata: <any>[],
  selectedProduct: <any>{},
};

const productSlices = createSlice({
  name: "product",
  initialState,
  reducers: {
    api_is_loading(state, action) {
      state.isloading = action.payload;
      state.error = "";
      state.productdata = [];
    },
    api_is_error(state, action) {
      state.isloading = false;
      state.error = action.payload;
      state.productdata = [];
    },
    api_is_success(state, action) {
      state.isloading = false;
      state.error = "";
      state.productdata = action.payload;
    },
    selected_product(state, action) {
      state.isloading = false;
      state.error = "";
      state.selectedProduct = action.payload;
    },
    is_selected_product(state, action) {
      state.selectedProduct = action.payload;
    },
  },
});

export const {
  api_is_loading,
  api_is_error,
  api_is_success,
  selected_product,
  is_selected_product,
} = productSlices.actions;

export default productSlices.reducer;

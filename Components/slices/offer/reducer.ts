import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  error: <any>"",
  offerData: <any>[],
  selectedoffer: <any>[],
};

const offerSlices = createSlice({
  name: "offer",
  initialState,
  reducers: {
    api_is_loading(state, action) {
      state.isloading = action.payload;
      state.error = "";
      state.offerData = [];
    },
    api_is_error(state, action) {
      state.isloading = false;
      state.error = action.payload;
      state.offerData = [];
    },
    api_is_success(state, action) {
      state.isloading = false;
      state.error = "";
      state.offerData = action.payload;
    },
    is_selected_success(state, action) {
      state.isloading = false;
      state.error = "";
      state.selectedoffer = action.payload;
    },
    is_recharge_selected(state, action) {
      state.isloading = false;
      state.error = "";
      state.selectedoffer = action.payload;
    },
  },
});

export const {
  api_is_loading,
  api_is_error,
  api_is_success,
  is_selected_success,
  is_recharge_selected,
} = offerSlices.actions;

export default offerSlices.reducer;

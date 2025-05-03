import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  error: <any>"",
  partnerData: <any>[],
  selectedpartner: <any>[],
};

const partnerSlices = createSlice({
  name: "partner",
  initialState,
  reducers: {
    api_is_loading(state, action) {
      state.isloading = action.payload;
      state.error = "";
      state.partnerData = [];
    },
    api_is_error(state, action) {
      state.isloading = false;
      state.error = action.payload;
      state.partnerData = [];
    },
    api_is_success(state, action) {
      state.isloading = false;
      state.error = "";
      state.partnerData = action.payload;
    },
    is_selected_success(state, action) {
      state.isloading = false;
      state.error = "";
      state.selectedpartner = action.payload;
    },
  },
});

export const {
  api_is_loading,
  api_is_error,
  api_is_success,
  is_selected_success,
} = partnerSlices.actions;

export default partnerSlices.reducer;

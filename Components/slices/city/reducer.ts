import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  error: <any>"",
  cityData: <any>[],
  selectedcity: <any>[],
};

const citySlices = createSlice({
  name: "city",
  initialState,
  reducers: {
    api_is_loading(state, action) {
      state.isloading = action.payload;
      state.error = "";
      state.cityData = [];
    },
    api_is_error(state, action) {
      state.isloading = false;
      state.error = action.payload;
      state.cityData = [];
    },
    api_is_success(state, action) {
      state.isloading = false;
      state.error = "";
      state.cityData = action.payload;
    },
    is_selected_success(state, action) {
      state.isloading = false;
      state.error = "";
      state.selectedcity = action.payload;
    },
  },
});

export const {
  api_is_loading,
  api_is_error,
  api_is_success,
  is_selected_success,
} = citySlices.actions;

export default citySlices.reducer;

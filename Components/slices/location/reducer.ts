import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  error: <any>"",
  locationData: <any>[],
  selectedlocation: <any>[],
};

const locationSlices = createSlice({
  name: "location",
  initialState,
  reducers: {
    api_is_loading(state, action) {
      state.isloading = action.payload;
      state.error = "";
      state.locationData = [];
    },
    api_is_error(state, action) {
      state.isloading = false;
      state.error = action.payload;
      state.locationData = [];
    },
    api_is_success(state, action) {
      state.isloading = false;
      state.error = "";
      state.locationData = action.payload;
    },
    is_selected_success(state, action) {
      state.isloading = false;
      state.error = "";
      state.selectedlocation = action.payload;
    },
  },
});

export const {
  api_is_loading,
  api_is_error,
  api_is_success,
  is_selected_success,
} = locationSlices.actions;

export default locationSlices.reducer;

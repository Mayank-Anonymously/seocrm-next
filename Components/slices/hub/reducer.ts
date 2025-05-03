import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  error: <any>"",
  hubData: <any>[],
  selectedhub: <any>[],
};

const hubSlices = createSlice({
  name: "hub",
  initialState,
  reducers: {
    api_is_loading(state, action) {
      state.isloading = action.payload;
      state.error = "";
      state.hubData = [];
    },
    api_is_error(state, action) {
      state.isloading = false;
      state.error = action.payload;
      state.hubData = [];
    },
    api_is_success(state, action) {
      state.isloading = false;
      state.error = "";
      state.hubData = action.payload;
    },
    is_selected_success(state, action) {
      state.isloading = false;
      state.error = "";
      state.selectedhub = action.payload;
    },
  },
});

export const {
  api_is_loading,
  api_is_error,
  api_is_success,
  is_selected_success,
} = hubSlices.actions;

export default hubSlices.reducer;

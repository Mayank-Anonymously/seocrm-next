import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  error: <any>"",
  contentData: <any>[],
  selectedcontent: <any>[],
};

const contentSlices = createSlice({
  name: "content",
  initialState,
  reducers: {
    api_is_loading(state, action) {
      state.isloading = action.payload;
      state.error = "";
      state.contentData = [];
    },
    api_is_error(state, action) {
      state.isloading = false;
      state.error = action.payload;
      state.contentData = [];
    },
    api_is_success(state, action) {
      state.isloading = false;
      state.error = "";
      state.contentData = action.payload;
    },
    is_selected_success(state, action) {
      state.isloading = false;
      state.error = "";
      state.selectedcontent = action.payload;
    },
  },
});

export const {
  api_is_loading,
  api_is_error,
  api_is_success,
  is_selected_success,
} = contentSlices.actions;

export default contentSlices.reducer;

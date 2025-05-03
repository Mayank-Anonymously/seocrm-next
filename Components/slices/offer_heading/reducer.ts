import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  error: <any>"",
  offerHeadingdata: <any>[],
  subcat: <any>[],
};

const offerHeadingSlices = createSlice({
  name: "offerheadingdata",
  initialState,
  reducers: {
    api_is_loading(state, action) {
      state.isloading = action.payload;
      state.error = "";
      state.offerHeadingdata = [];
    },
    api_is_error(state, action) {
      state.isloading = false;
      state.error = action.payload;
      state.offerHeadingdata = [];
    },
    api_is_success(state, action) {
      state.isloading = false;
      state.error = "";
      state.offerHeadingdata = action.payload.response;
    },
    api_is_sub_success(state, action) {
      console.log("action.payload:", action.payload);
      state.isloading = false;
      state.error = "";
      state.subcat = action.payload.response;
    },
  },
});

export const {
  api_is_loading,
  api_is_error,
  api_is_success,
  api_is_sub_success,
} = offerHeadingSlices.actions;

export default offerHeadingSlices.reducer;

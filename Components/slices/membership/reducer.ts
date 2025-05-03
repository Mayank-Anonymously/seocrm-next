import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  error: <any>"",
  membershipdata: <any>[],
  subcat: <any>[],
  data: <any>[],
  selected: <any>{},
};

const membershipSlices = createSlice({
  name: "membership",
  initialState,
  reducers: {
    api_is_loading(state, action) {
      state.isloading = action.payload;
      state.error = "";
      state.membershipdata = [];
    },
    api_is_error(state, action) {
      state.isloading = false;
      state.error = action.payload;
      state.membershipdata = [];
    },
    api_is_success(state, action) {
      state.isloading = false;
      state.error = "";
      state.membershipdata = action.payload.response;
    },
    api_all_is_success(state, action) {
      state.isloading = false;
      state.error = "";
      state.data = action.payload.response;
    },
    selected_is_success(state, action) {
      state.isloading = false;
      state.error = "";
      state.selected = action.payload;
    },
    api_is_sub_success(state, action) {
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
  api_all_is_success,
  selected_is_success,
} = membershipSlices.actions;

export default membershipSlices.reducer;

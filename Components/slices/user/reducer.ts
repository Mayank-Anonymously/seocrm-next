import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  error: <any>"",
  userdata: <any>[],
  subcat: <any>[],
  selected: <any>{},
};

const userSlices = createSlice({
  name: "user",
  initialState,
  reducers: {
    api_is_loading(state, action) {
      state.isloading = action.payload;
      state.error = "";
      state.userdata = [];
    },
    api_is_error(state, action) {
      state.isloading = false;
      state.error = action.payload;
      state.userdata = [];
    },
    api_is_success(state, action) {
      state.isloading = false;
      state.error = "";
      state.userdata = action.payload;
    },
    api_is_sub_success(state, action) {
      state.isloading = false;
      state.error = "";
      state.subcat = action.payload.response;
    },
    is_user_selected(state, action) {
      state.selected = action.payload;
    },
  },
});

export const {
  api_is_loading,
  api_is_error,
  api_is_success,
  api_is_sub_success,
  is_user_selected,
} = userSlices.actions;

export default userSlices.reducer;

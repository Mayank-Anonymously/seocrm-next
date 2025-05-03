import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: "",
  activitydata: [],
};

const activitySlice = createSlice({
  name: "activitySlice",
  initialState,
  reducers: {
    api_is_activitydata_loading(state, action) {
      state.isLoading = action.payload;
      state.isError = "";
      state.activitydata = [];
    },
    api_is_activitydata_error(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
      state.activitydata = [];
    },
    api_is_activitydata_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.activitydata = action.payload.payload;
    },
  },
});

export const {
  api_is_activitydata_loading,
  api_is_activitydata_error,
  api_is_activitydata_success,
} = activitySlice.actions;
export default activitySlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: "",
  serverLoading: true,
  pipelinedata: [],
  pipelinejobs: [],
  degree: [],
};

const pipeSlice = createSlice({
  name: "pipeSlice",
  initialState,
  reducers: {
    api_is_pipelinedata_loading(state, action) {
      state.isLoading = action.payload;
      state.serverLoading = action.payload;
      state.isError = "";
      state.pipelinedata = [];
    },
    api_is_pipelinedata_error(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
      state.pipelinedata = [];
    },
    api_is_pipelinedata_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.pipelinedata = action.payload;
    },

    api_is_pipelinejobs_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.pipelinejobs = action.payload;
    },
    api_is_degree_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.degree = action.payload;
    },
  },
});

export const {
  api_is_pipelinedata_loading,
  api_is_pipelinedata_error,
  api_is_pipelinedata_success,
  api_is_pipelinejobs_success,
  api_is_degree_success,
} = pipeSlice.actions;
export default pipeSlice.reducer;

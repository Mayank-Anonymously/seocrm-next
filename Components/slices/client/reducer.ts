import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: "",
  customerQuery: <any>[],
  roles: <any>[],
  selectedclient: <any>{},
};

const customerQuery = createSlice({
  name: "customerQuery",
  initialState,
  reducers: {
    api_is_customerQuery_loading(state, action) {
      state.isLoading = action.payload;
      state.isError = "";
      state.customerQuery = [];
    },
    api_is_customerQuery_error(state, action) {
      state.isLoading = false;
      state.isError = action.payload;
      state.customerQuery = [];
    },
    api_is_customerQuery_success(state, action) {
      console.log(action.payload);
      state.isLoading = false;
      state.isError = "";
      state.customerQuery = action.payload;
    },
    is_client_selected_success(state, action) {
      state.isLoading = false;
      state.isError = "";
      state.selectedclient = action.payload;
    },
  },
});

export const {
  api_is_customerQuery_loading,
  api_is_customerQuery_error,
  api_is_customerQuery_success,
  is_client_selected_success,
} = customerQuery.actions;
export default customerQuery.reducer;

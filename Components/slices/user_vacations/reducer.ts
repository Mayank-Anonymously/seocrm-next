import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  error: <any>"",
  uservacations: <any>[]
};

const userVacationsSlice = createSlice({
  name: "uservacations",
  initialState,
  reducers: {
    api_is_loading(state, action) {
      state.isloading = action.payload;
      state.error = "";
      state.uservacations = [];
    },
    api_is_error(state, action) {
      state.isloading = false;
      state.error = action.payload;
      state.uservacations = [];
    },
    api_is_success(state, action) {
      state.isloading = false;
      state.error = "";
      state.uservacations = action.payload.response;
    }
  },
});

export const {
  api_is_loading,
  api_is_error,
  api_is_success
} = userVacationsSlice.actions;

export default userVacationsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloading: false,
  error: <any>"",
  testimonialdata: <any>[],
  selectedTestimonial: <any>{},
};

const testimonialSlices = createSlice({
  name: "testimonial",
  initialState,
  reducers: {
    api_is_loading(state, action) {
      state.isloading = action.payload;
      state.error = "";
      state.testimonialdata = [];
    },
    api_is_error(state, action) {
      state.isloading = false;
      state.error = action.payload;
      state.testimonialdata = [];
    },
    api_is_success(state, action) {
      state.isloading = false;
      state.error = "";
      state.testimonialdata = action.payload;
    },
    selected_testimonial(state, action) {
      state.isloading = false;
      state.error = "";
      state.selectedTestimonial = action.payload;
    },
    is_selected_testimonial(state, action) {
      state.selectedTestimonial = action.payload;
    },
  },
});

export const {
  api_is_loading,
  api_is_error,
  api_is_success,
  selected_testimonial,
  is_selected_testimonial,
} = testimonialSlices.actions;

export default testimonialSlices.reducer;

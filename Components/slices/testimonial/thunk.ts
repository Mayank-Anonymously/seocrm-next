import Swal from "sweetalert2";
import {
  GET_ALL_TESTIMONIAL,
  baseURL,
  ADD_NEW_TESTIMONIAL,
  EDIT_TESTIMONIAL,
  UPDATE_TESTIMOINAL_STATUS,
  DELETE_TESTIMONIAL
} from "Components/helpers/url_helper";
import axios from "axios";
import { api_is_error, api_is_loading, api_is_success } from "./reducer";

export const GetAllTestimonial = () => async (dispatch: any) => {
  try {
    const options = {
      method: "GET",
      url: `${baseURL}${GET_ALL_TESTIMONIAL}`,
    };
    const apifetch = await axios.request(options);
    const response: any = await apifetch;
    dispatch(api_is_success(response));
    return response;
  } catch (error) {
    dispatch(api_is_error(error));

    return error;
  }
};

export const PostTestimonial = (values: any) => async (dispatch: any) => {
  try {
    const form = new FormData();
    form.append("title", values.title);
    form.append("image", values.image);
    form.append("description", values.description);
    console.log("form:", form);

    const options = {
      method: "POST",
      url: `${baseURL}${ADD_NEW_TESTIMONIAL}`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: form,
    };
    dispatch(api_is_loading(true));

    const apifetch = await axios.request(options);
    dispatch(api_is_loading(true));
    const response: any = await apifetch;
    console.log(response,"lll");
    dispatch(api_is_loading(false));
    if (response.status === 1) {
      /* Add SweetAlert Success */
      Swal.fire({
        title: "Good job!",
        text: response.message,
        icon: "success",
      }).then(() => {
        dispatch(GetAllTestimonial());
      });
    } else {
      /* Add SweetAlert Eror */
      Swal.fire({
        title: "Error !!!",
        text: response.message,
        icon: "error",
      });
    }
    return response;
  } catch (error: any) {
    Swal.fire({
      title: "Error!",
      text: error,
      icon: "error",
    });
    dispatch(api_is_error(error));
  }
};


export const editTestimonial = (id: any, values: any) => async (dispatch: any) => {
  console.log("values:", values.images);
  const form = new FormData();
  form.append("title", values.title);
  form.append("image", values.image);
  form.append("description", values.description);
  const options = {
    method: "PATCH",
    url: `${baseURL}${EDIT_TESTIMONIAL}${id}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: form,
  };
  const fetchapi = await axios.request(options);
  const resp: any = await fetchapi;
  const { response, baseResponse }:any = resp;
  console.log(resp);
  if (baseResponse.status === 1) {
    Swal.fire({
      title: "Good job!",
      text: baseResponse.message,
      icon: "success",
    }).then(() => {
      dispatch(GetAllTestimonial());
    });
  } else {
    Swal.fire({
      title: "Error !!!",
      text: baseResponse.message,
      icon: "error",
    });
  }
};

export const updateTestimonialStatus =
  (id: any, values: any) => async (dispatch: any) => {
    const options = {
      method: "PATCH",
      url: `${baseURL}${UPDATE_TESTIMOINAL_STATUS}${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { status: values },
    };
    const fetchapi = await axios.request(options);
    const resp: any = await fetchapi;
    const { response, baseResponse } = resp;
    if (baseResponse.status === 1) {
      dispatch(GetAllTestimonial());
    } else {
      Swal.fire({
        title: "Error !!!",
        text: baseResponse.message,
        icon: "error",
      });
    }
  };

  export const deleteTestimonial = (id: any) => async (dispatch: any) => {
    try {
      const options = {
        url: `${baseURL}${DELETE_TESTIMONIAL}${id}`,
        method: "GET",
      };
      const fetchapi = await axios.request(options);
      const resp: any = await fetchapi;
      const { response, baseResponse } = resp;
      if (baseResponse.status === 1) {
        Swal.fire({
          title: "Good job!",
          text: baseResponse.message,
          icon: "success",
        }).then(() => {
          dispatch(GetAllTestimonial());
        });
      } else {
        Swal.fire({
          title: "Something went wrong",
          text: "error",
          icon: "error",
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

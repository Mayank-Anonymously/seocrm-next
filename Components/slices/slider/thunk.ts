import { UPLOAD_SLIDER, baseURL,GET_ALL_SLIDER,UPDATE_SLIDER,DELETE_SLIDER,UPDATE_SLIDER_STATUS } from "Components/helpers/url_helper";
import { api_is_error, api_is_loading, api_is_success } from "./reducer";
import axios from "axios";
import Swal from "sweetalert2";

export const GetAllSlider = () => async (dispatch: any) => {
  try {
    const options = {
      method: "GET",
      url: `${baseURL}${GET_ALL_SLIDER}`,
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


export const Uploadslider = (values: any) => async (dispatch: any) => {
  try {
    console.log(values,"dt")
    const form = new FormData();
    form.append("upload", values.image);
    const options = {
      method: "POST",
      url: `${baseURL}${UPLOAD_SLIDER}`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: form
    };
    dispatch(api_is_loading(true));
    const apifetch = await axios.request(options);
    dispatch(api_is_loading(true));
    const response: any = await apifetch;
    dispatch(api_is_loading(false));
    if (response.baseResponse.status === 1) {
      Swal.fire({
        title: "Good job!",
        text: response.message,
        icon: "success",
      }).then(() => {
        dispatch(GetAllSlider());
      });
    } else {
      Swal.fire({
        title: "error",
        text: response.baseResponse.message,
        icon: "error",
      });
      dispatch(api_is_error(response));
    }
    return response;
  } catch (error: any) {
    console.log(error);
    Swal.fire({
      title: "error!",
      text: error,
      icon: "error",
    });
    dispatch(api_is_error(error));
  }
};
export const editSlider = (id: any, values: any) => async (dispatch: any) => {
  console.log("values:", values);
  const form = new FormData();
  form.append("upload", values.image);
  const options = {
    method: "PATCH",
    url: `${baseURL}${UPDATE_SLIDER}${id}`,
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
      dispatch(GetAllSlider());
    });
  } else {
    Swal.fire({
      title: "Error !!!",
      text: baseResponse.message,
      icon: "error",
    });
  }
};


export const deleteSlider = (id: any) => async (dispatch: any) => {
  try {
    const options = {
      url: `${baseURL}${DELETE_SLIDER}${id}`,
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
        dispatch(GetAllSlider());
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

export const updateSliderStatus =
  (id: any, values: any) => async (dispatch: any) => {
    console.log(id,"aewrgwrtg")
    const options = {
      method: "PATCH",
      url: `${baseURL}${UPDATE_SLIDER_STATUS}${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { status: values },
    };
    const fetchapi = await axios.request(options);
    const resp: any = await fetchapi;
    const { response, baseResponse } = resp;
    if (baseResponse.status === 1) {
      dispatch(GetAllSlider());
    } else {
      Swal.fire({
        title: "Error !!!",
        text: baseResponse.message,
        icon: "error",
      });
    }
  };


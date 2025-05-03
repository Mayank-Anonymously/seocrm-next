import { UPLOAD_BANNER, baseURL,GET_ALL_BANNERS,UPDATE_BANNER,DELETE_BANNER,UPDATE_BANNER_STATUS } from "Components/helpers/url_helper";
import { api_is_error, api_is_loading, api_is_success } from "./reducer";
import axios from "axios";
import Swal from "sweetalert2";

export const GetAllBanner = () => async (dispatch: any) => {
  try {
    const options = {
      method: "GET",
      url: `${baseURL}${GET_ALL_BANNERS}`,
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


export const Uploadbanner = (values: any) => async (dispatch: any) => {
  try {
    console.log(values,"dt")
    const form = new FormData();
    form.append("upload", values.image);
    const options = {
      method: "POST",
      url: `${baseURL}${UPLOAD_BANNER}`,
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
        dispatch(GetAllBanner());
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
export const editBanner = (id: any, values: any) => async (dispatch: any) => {
  console.log("values:", values);
  const form = new FormData();
  form.append("upload", values.image);
  const options = {
    method: "PATCH",
    url: `${baseURL}${UPDATE_BANNER}${id}`,
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
      dispatch(GetAllBanner());
    });
  } else {
    Swal.fire({
      title: "Error !!!",
      text: baseResponse.message,
      icon: "error",
    });
  }
};


export const deleteBanner = (id: any) => async (dispatch: any) => {
  try {
    const options = {
      url: `${baseURL}${DELETE_BANNER}${id}`,
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
        dispatch(GetAllBanner());
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

export const updateBannerStatus =
  (id: any, values: any) => async (dispatch: any) => {
    console.log(id,"aewrgwrtg")
    const options = {
      method: "PATCH",
      url: `${baseURL}${UPDATE_BANNER_STATUS}${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { status: values },
    };
    const fetchapi = await axios.request(options);
    const resp: any = await fetchapi;
    const { response, baseResponse } = resp;
    if (baseResponse.status === 1) {
      dispatch(GetAllBanner());
    } else {
      Swal.fire({
        title: "Error !!!",
        text: baseResponse.message,
        icon: "error",
      });
    }
  };


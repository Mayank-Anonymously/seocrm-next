import { CREATE_OFFER_HEADING, baseURL,GET_ALL_OFFER_HEADING,EDIT_OFFER_HEADING,DELETE_OFFER_HEADING } from "Components/helpers/url_helper";
import { api_is_error, api_is_loading, api_is_success } from "./reducer";
import axios from "axios";
import Swal from "sweetalert2";

export const GetAllOfferHeading = () => async (dispatch: any) => {
  try {
    const options = {
      method: "GET",
      url: `${baseURL}${GET_ALL_OFFER_HEADING}`,
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


export const createOfferHeading = (values: any) => async (dispatch: any) => {
  try {
    console.log(values,"dt")
    const options = {
      method: "POST",
      url: `${baseURL}${CREATE_OFFER_HEADING}`,
      data: values
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
        dispatch(GetAllOfferHeading());
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
export const editOfferHeading = (id: any, values: any) => async (dispatch: any) => {
  const options = {
    method: "PATCH",
    url: `${baseURL}${EDIT_OFFER_HEADING}${id}`,
    data: values,
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
      dispatch(GetAllOfferHeading());
    });
  } else {
    Swal.fire({
      title: "Error !!!",
      text: baseResponse.message,
      icon: "error",
    });
  }
};


export const deleteOfferHeading = (id: any) => async (dispatch: any) => {
  try {
    const options = {
      url: `${baseURL}${DELETE_OFFER_HEADING}${id}`,
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
        dispatch(GetAllOfferHeading());
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



import {
  ADD_NEW_HUB,
  CREATE_NEW_OFFER,
  CREATE_OFFER,
  EDIT_RECHARGE_OFFER,
  GET_ALL_HUB,
  GET_ALL_OFFER,
  GET_RECHARGE_OFFER,
  baseURL,
} from "Components/helpers/url_helper";
import axios from "axios";
import Swal from "sweetalert2";
import { api_is_success } from "./reducer";

export const CreateNewOffer = (values: any) => async (dispatch: any) => {
  try {
    const data = {
      url: `${baseURL}${CREATE_OFFER}`,
      method: "POST",
      data: {
        dealType: values.type,
        offerTitle: values.title,
        offerDescription: values.description,
        offerValidity: values.validity,
        couponCode: values.coupon,
      },
    };
    const fetchapi = await axios.request(data);
    const resp: any = await fetchapi;

    const { baseResponse, response } = resp;
    if (baseResponse.status === 1) {
      Swal.fire({
        title: "Success",
        text: baseResponse.message,
        icon: "success",
      });
    }
  } catch (error: any) {
    Swal.fire({
      title: "Error occured",
      text: error,
      icon: "error",
    });
  }
};

export const FetchAllOffers = () => async (dispatch: any) => {
  try {
    const data = {
      url: `${baseURL}${GET_ALL_OFFER}`,
      method: "GET",
    };
    const fetchapi = await axios.request(data);
    const resp: any = await fetchapi;

    const { baseResponse, response } = resp;
    if (baseResponse.status === 1) {
      dispatch(api_is_success(response));
    }
  } catch (error: any) {
    Swal.fire({
      title: "Error occured",
      text: error,
      icon: "error",
    });
  }
};

export const CreateRechargeOffer = (values: any) => async (dispatch: any) => {
  try {
    const data = {
      url: `${baseURL}${CREATE_NEW_OFFER}`,
      method: "POST",
      data: {
        cashback: values.cashback,
        value: values.value,
        validity:values.validity
      },
    };
    const fetchapi = await axios.request(data);
    const resp: any = await fetchapi;

    const { baseResponse, response } = resp;
    if (baseResponse.status === 1) {
      Swal.fire({
        title: "Success",
        text: baseResponse.message,
        icon: "success",
      });
    }
  } catch (error: any) {
    Swal.fire({
      title: "Error occured",
      text: error,
      icon: "error",
    });
  }
};

export const GetRechargeOffer = () => async (dispatch: any) => {
  try {
    const data = {
      url: `${baseURL}${GET_RECHARGE_OFFER}`,
      method: "GET",
    };
    const fetchapi = await axios.request(data);
    const resp: any = await fetchapi;

    const { baseResponse, response } = resp;
    if (baseResponse.status === 1) {
      dispatch(api_is_success(response));
    }
  } catch (error: any) {
    Swal.fire({
      title: "Error occured",
      text: error,
      icon: "error",
    });
  }
};

export const EditRechargeOffer =
  (values: any, id: any, router: any) => async (dispatch: any) => {
    try {
      const data = {
        url: `${baseURL}${EDIT_RECHARGE_OFFER}/${id}`,
        method: "PATCH",
        data: {
          cashback: values.cashback,
          value: values.value,
          validity:values.validity
        },
      };
      const fetchapi = await axios.request(data);
      const resp: any = await fetchapi;

      const { baseResponse, response } = resp;
      if (baseResponse.status === 1) {
        Swal.fire({
          title: "Success",
          text: baseResponse.message,
          icon: "success",
        }).then(() => {
          dispatch(GetRechargeOffer());
        });
        dispatch(api_is_success(response));
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error occured",
        text: error,
        icon: "error",
      });
    }
  };

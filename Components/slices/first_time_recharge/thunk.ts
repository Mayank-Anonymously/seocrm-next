import {
  ADD_NEW_HUB,
  CREATE_NEW_OFFER,
  CREATE_OFFER,
  EDIT_RECHARGE_OFFER,
  GET_ALL_HUB,
  GET_ALL_FIRST_TIME_RECHARGE,
  CREATE_FIRST_TIME_RECHARGE,
  EDIT_FIRST_TIME_RECHARGE,
  baseURL,
} from "Components/helpers/url_helper";
import axios from "axios";
import Swal from "sweetalert2";
import { api_is_success } from "./reducer";


export const CreatefirsttimeRechargeOffer = (values: any) => async (dispatch: any) => {
  try {
    console.log(values.name);
    const data = {
      url: `${baseURL}${CREATE_FIRST_TIME_RECHARGE}`,
      method: "POST",
      data: {
        cashback: values.cashback,
        value: values.value,
        validity:values.validity,
        name:values.name,
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

export const GetfirstTimeRechargeOffer = () => async (dispatch: any) => {
  try {
    const data = {
      url: `${baseURL}${GET_ALL_FIRST_TIME_RECHARGE}`,
      method: "GET",
    };
    const fetchapi = await axios.request(data);
    const resp: any = await fetchapi;

    const { baseResponse, response } = resp;
    console.log(response,'sds');
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

export const EditFirstTimeRechargeOffer =
  (values: any, id: any, router: any) => async (dispatch: any) => {
    try {
      const data = {
        url: `${baseURL}${EDIT_FIRST_TIME_RECHARGE}/${id}`,
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
          dispatch(GetfirstTimeRechargeOffer());
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

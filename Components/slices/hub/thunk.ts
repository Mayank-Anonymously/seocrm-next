import {
  ADD_NEW_HUB,
  GET_ALL_HUB,
  baseURL,
} from "Components/helpers/url_helper";
import axios from "axios";
import Swal from "sweetalert2";
import { api_is_success } from "./reducer";

export const AddNewHub = (values: any) => async (dispatch: any) => {
  try {
    const data = {
      url: `${baseURL}${ADD_NEW_HUB}`,
      method: "POST",
      data: {
        cityName: values.cityName,
        hubName: values.hubName,
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

export const GetAllHubs = () => async (dispatch: any) => {
  try {
    const data = {
      url: `${baseURL}${GET_ALL_HUB}`,
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

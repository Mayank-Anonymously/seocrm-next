import {
  ADD_NEW_CITY,
  ADD_NEW_LOCATION,
  baseURL,
  GET_ALL_CITY,
  GET_ALL_LOCATIONS,
} from "Components/helpers/url_helper";
import axios from "axios";
import Swal from "sweetalert2";
import { api_is_success } from "./reducer";

export const AddNewCity = (values: any) => async () => {
  try {
    const options = {
      url: `${baseURL}${ADD_NEW_CITY}`,
      method: "POST",
      data: {
        cityName: values.cityName,
      },
    };
    const fetchapi = await axios.request(options);
    const resp: any = await fetchapi;
    const { response, baseResponse } = resp;
    if (baseResponse.status === 1) {
      Swal.fire({
        title: "Success",
        text: baseResponse.message,
        icon: "success",
      });
    }
  } catch (error: any) {
    Swal.fire({
      title: error,
      text: error,
      icon: "error",
    });
  }
};
export const GetAllCity = () => async (dispatch: any) => {
  try {
    const options = {
      url: `${baseURL}${GET_ALL_CITY}`,
      method: "GET",
    };
    const fetchapi = await axios.request(options);
    const resp: any = await fetchapi;
    const { response, baseResponse } = resp;
    if (baseResponse.status === 1) {
      dispatch(api_is_success(response));
    }
  } catch (error) {
    console.log("error", error);
  }
};

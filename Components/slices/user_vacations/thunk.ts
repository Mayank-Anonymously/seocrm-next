import Swal from "sweetalert2";
import {
  baseURL,
  GET_All_VACATIONS,
  GET_ALL_QUERY
} from "Components/helpers/url_helper";
import axios from "axios";
import {
  api_is_error,
  api_is_success,
} from "./reducer";

export const GetAllQuery = () => async (dispatch: any) => {
  try {
    const options = {
      method: "GET",
      url: `${baseURL}${GET_ALL_QUERY}`,
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
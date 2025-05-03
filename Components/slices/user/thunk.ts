import {
  GET_ALL_USER,
  hrms_api_host,
} from "Components/helpers/url_helper";
import axios from "axios";
import {
  api_is_userdata_error,
  api_is_userdata_loading,
  api_is_userdata_success,
} from "./reducers";

export const fetchAllUser = () => async (dispatch: any) => {
  try {
    dispatch(api_is_userdata_loading(true));
    const fetch_api = axios.get(`${hrms_api_host}${GET_ALL_USER}`);
    const data: any = await fetch_api;
    dispatch(api_is_userdata_success(data.user));
    return data;
  } catch (error) {
    dispatch(api_is_userdata_error(error));
    return error;
  }
};


import {
  EDIT_USER,
  GET_ALL_ROLES,
  GET_ALL_USER,
  MAIL,
  MANAGER_BY_ROLE,
  POST_NEW_USER,
  POST_RESET_,
  hrms_api_host,
  job_api_host,
  redirect,
} from "Components/helpers/url_helper";
import axios from "axios";
import { toast } from "react-toastify";
import {
  api_is_roles_fetched,
  api_is_userdata_error,
  api_is_userdata_loading,
  api_is_userdata_success,
  is_user_manager_success,
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


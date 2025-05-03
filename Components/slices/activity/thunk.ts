import { LOGIN_ACTIVITY, hrms_api_host } from "Components/helpers/url_helper";
import axios from "axios";
import { toast } from "react-toastify";
import {
  api_is_activitydata_error,
  api_is_activitydata_loading,
  api_is_activitydata_success,
} from "./reducer";
import moment from "moment";
import Swal from "sweetalert2";

export const fetchActivity =
  (fromDate: any, toDate: any) => async (dispatch: any) => {
    var date1 = fromDate
      ? fromDate
      : moment().subtract(1, "days").format("YYYY-MM-DD");
    const date2 = toDate
      ? moment(toDate).format("YYYY-MM-DD")
      : moment().subtract(1, "days").format("YYYY-MM-DD");

    // try {
    //   dispatch(api_is_activitydata_loading(true));
    //   const fetch_api = axios.get(
    //     `${hrms_api_host}${LOGIN_ACTIVITY}?endDate=${date2}&startDate${date1}`
    //   );
    //   const data = await fetch_api;
    //   dispatch(api_is_activitydata_success(data));
    //   return data;
    // } catch (error) {
    //   dispatch(api_is_activitydata_error(error));
    //   return error;
    // }

    try {
      dispatch(api_is_activitydata_loading(true));
      const options = {
        method: "GET",
        url: `${hrms_api_host}${LOGIN_ACTIVITY}`,
        params: {
          endDate: date2,
          startDate: date1,
        },
      };
      dispatch(api_is_activitydata_loading(true));
      const fetchApi = axios.request(options);
      const data: any = await fetchApi;
      if (data.status === "OK") {
        dispatch(api_is_activitydata_loading(false));
        dispatch(api_is_activitydata_success(data));
      } else {
        Swal.fire({
          title: "Error",
          text: "Can't Display Activity",
          timer: 2000,
        });
      }

      return data;
    } catch (error) {
      dispatch(api_is_activitydata_error(error));
      return error;
    }

    // try {
    //   const options = {
    //     url: `${hrms_api_host}${LOGIN_ACTIVITY}?endDate=${date2}&startDate=${date1}`,
    //     method: "GET",
    //     headers: { "Content-Type": "application/json" },
    //   };
    //   dispatch(api_is_activitydata_loading(true));
    //   const fetch_api = axios.request(options);
    //   const data = await fetch_api;
    //   dispatch(api_is_activitydata_success(data));
    //   return data;
    // } catch (error) {
    //   dispatch(api_is_activitydata_error(error));
    //   toast.error("API Key Added Failed", { autoClose: 3000 });
    //   return error;
    // }
  };

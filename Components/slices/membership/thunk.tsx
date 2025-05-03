import {
  CREATE_MEMBERSHIP,
  CREATE_NEW_MEMBERSHIP,
  EDIT_MEMBERSHIP,
  GET_ALL_MEMBERSHIP,
  baseURL,
} from "Components/helpers/url_helper";
import axios from "axios";
import Swal from "sweetalert2";
import { api_all_is_success } from "./reducer";

export const CreateMembership = (values: any) => async (dispatch: any) => {
  try {
    const options = {
      method: "POST",
      url: `${baseURL}${CREATE_NEW_MEMBERSHIP}`,
      data: { membershipDetails: values },
    };

    const apifetch = await axios.request(options);
    const resp: any = await apifetch;
    console.log("resp:", resp);
    if (resp.baseResponse.status === 1) {
      Swal.fire({
        title: "Good job!",
        text: resp.baseResponse.message,
        icon: "success",
      });
    }
    return resp;
  } catch (error: any) {
    Swal.fire({
      title: "error!",
      text: error,
      icon: "error",
    });
  }
};

export const GetMembership = () => async (dispatch: any) => {
  try {
    const options = {
      method: "GET",
      url: `${baseURL}${GET_ALL_MEMBERSHIP}`,
    };

    const apifetch = await axios.request(options);
    const resp: any = await apifetch;
    console.log(resp);
    if (resp.baseResponse.status === 1) {
      dispatch(api_all_is_success(resp));
    }
    return resp;
  } catch (error: any) {
    Swal.fire({
      title: "error!",
      text: error,
      icon: "error",
    });
  }
};

export const editMembership =
  (values: any, id: any, router: any) => async (dispatch: any) => {
    try {
      const options = {
        method: "PATCH",
        url: `${baseURL}${EDIT_MEMBERSHIP}/${id}`,
        data: { membershipDetails: values },
      };

      const apifetch = await axios.request(options);
      const resp: any = await apifetch;
      console.log("resp:", resp);
      if (resp.baseResponse.status === 1) {
        Swal.fire({
          title: "Good job!",
          text: resp.baseResponse.message,
          icon: "success",
        }).then(() => {
          router.push("/membership");
        });
      }
      return resp;
    } catch (error: any) {
      Swal.fire({
        title: "error!",
        text: error,
        icon: "error",
      });
    }
  };

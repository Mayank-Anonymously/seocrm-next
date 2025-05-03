import {
  ADD_NEW_LOCATION,
  baseURL,
  DELETELOCATION,
  GET_ALL_LOCATIONS,
  UPDATELOCATION,
} from "Components/helpers/url_helper";
import axios from "axios";
import Swal from "sweetalert2";
import { api_is_success } from "./reducer";

export const Addnewlocation = (values: any) => async () => {
  try {
    const options = {
      url: `${baseURL}${ADD_NEW_LOCATION}`,
      method: "POST",
      data: {
        location: values.location,
        locationName: values.locationName,
        radius: values.radius,
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

export const GetAllLocation = () => async (dispatch: any) => {
  try {
    const options = {
      url: `${baseURL}${GET_ALL_LOCATIONS}`,
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

export const DeleteLocation = (id: any) => async (dispatch: any) => {
  try {
    const options = {
      url: `${baseURL}${DELETELOCATION}${id}`,
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
        dispatch(GetAllLocation());
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

export const updateLocation =
  (values: any, id: any, router: any) => async (dispatch: any) => {
    try {
      const options = {
        url: `${baseURL}${UPDATELOCATION}${id}`,
        method: "PATCH",
        data: { radius: values.radius,locationName:values.locationName },
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
          dispatch(GetAllLocation());
          router.push("/location");
        });
      } else {
        Swal.fire({
          title: "Something went wrong",
          text: "error",
          icon: "error",
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

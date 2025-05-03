import {
  ADD_NEW_PARTNER,
  GET_ALL_PARTNER,
  baseURL,
} from "Components/helpers/url_helper";
import axios from "axios";
import Swal from "sweetalert2";
import { api_is_success, api_is_error } from "./reducer";

export const AddnewPartner = (values: any) => async (dispatch: any) => {
  try {
    const form = new FormData();

    form.append("name", values.name);
    form.append("document", values.document[0]);
    form.append("email", values.email);
    form.append("contact", values.contact);
    form.append("address", values.address);
    form.append("city", values.city);
    form.append("hub", values.hub);

    const data = {
      method: "POST",
      url: `${baseURL}${ADD_NEW_PARTNER}`,
      data: form,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const fetchapi = await axios.request(data);
    const resp: any = await fetchapi;
    const { baseResponse, response } = resp.data; // Ensure this matches your API structure

    if (baseResponse.status === 1) {
      Swal.fire({
        title: "Submission success",
        text: baseResponse.message,
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Submission failed",
        text: baseResponse.message || "Unexpected error",
        icon: "error",
      });
    }
  } catch (error: any) {
    Swal.fire({
      title: "Submission error",
      text: error.message || "An unexpected error occurred",
      icon: "error",
    });
  }
};

export const GetAllPartner = () => async (dispatch: any) => {
  try {
    const options = {
      url: `${baseURL}${GET_ALL_PARTNER}`, // Added backticks here
      method: "GET",
    };
    const response: any = await axios.request(options);

    // Assuming the API response is structured correctly
    if (response && response.baseResponse.status === 1) {
      dispatch(api_is_success(response.response));
    } else {
      dispatch(api_is_error("Failed to fetch partners."));
    }
  } catch (error) {
    console.log("Error fetching partners:", error);
    dispatch(api_is_error("Error fetching partners."));
  }
};

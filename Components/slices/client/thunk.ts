import {  GET_ALL_QUERY, hrms_api_host } from "Components/helpers/url_helper";
import axios from "axios";
import { toast } from "react-toastify";
import {
  api_is_customerQuery_error,
  api_is_customerQuery_loading,
  api_is_customerQuery_success,
} from "./reducer";
import Factory from "Components/APIFactory/Factory";
import Swal from "sweetalert2";

export const fetchQueries = () => async (dispatch: any) => {
  try {
    var setter: any = [];
    const url = `${hrms_api_host}${GET_ALL_QUERY}`;
    dispatch(api_is_customerQuery_loading(true));
    const fetch : any = await Factory("GET", setter, url, {});
    dispatch(api_is_customerQuery_success(fetch.response));

    // dispatch(api_is_userdata_loading(false));
  } catch (error) {
    dispatch(api_is_customerQuery_error(error));
  }
};

export const AddNewClient =
  (values: any, router: any) => async (dispatch: any) => {
    dispatch(api_is_customerQuery_loading(true));
    try {
      var setter: any = [];
      const url = `${hrms_api_host}${GET_ALL_QUERY}`;
      const body = {
        name: values.name,
        email: values.email,
        address: values.address,
        phone: values.phone,
        contactPerson: values.contactPerson,
        parentOrganization: values.parentOrganization,
      };
      dispatch(api_is_customerQuery_loading(true));
      const fetch: any = await Factory("POST", setter, url, body);

      dispatch(api_is_customerQuery_loading(true));
      if (fetch.status === "OK") {
        dispatch(api_is_customerQuery_loading(false));
        // dispatch(fetchClient());
        Swal.fire("Success", "Client added successfully", "success").then(
          () => {
            router.push("/client/view-client");
          }
        );
      } else {
        dispatch(api_is_customerQuery_loading(false));

        Swal.fire({ title: "Error", text: fetch.errors, timer: 2000 });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const EditNewClient =
  (values: any, router: any) => async (dispatch: any) => {
    dispatch(api_is_customerQuery_loading(true));
    try {
      var setter: any = [];
      const url = `${hrms_api_host}${GET_ALL_QUERY}`;
      const body = {
        id: values.id,
        name: values.name,
        email: values.email,
        address: values.address,
        phone: values.phone,
        contactPerson: values.contactPerson,
        parentOrganization: values.parentOrganization,
      };
      dispatch(api_is_customerQuery_loading(true));
      const fetch: any = await Factory("PATCH", setter, url, body);
      dispatch(api_is_customerQuery_loading(true));

      if (fetch.status === "OK") {
        dispatch(api_is_customerQuery_loading(false));
        // dispatch(fetchClient());
        Swal.fire("Success", "Client Edit successfully", "success").then(() => {
          router.push("/client/view-client");
        });
      } else {
        dispatch(api_is_customerQuery_loading(false));
        Swal.fire({
          title: "Error",
          text: fetch.errors,
          timer: 8000,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch(api_is_customerQuery_error(error));
    }
  };

export const deteleClient = (id: any) => async (dispatch: any) => {
  try {
    var setter: any = [];
    const url = `${hrms_api_host}${GET_ALL_QUERY}/${id}`;
    const fetch: any = await Factory("DELETE", setter, url, {});

    if (fetch.status === "OK") {
      // dispatch(fetchClient());
    }
  } catch (error) {
    console.log(error);
  }
};

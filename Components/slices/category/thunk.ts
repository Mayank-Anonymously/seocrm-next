import Swal from "sweetalert2";
import {
  GET_ALL_CATEGORY,
  POST_NEW_CATEGORY,
  POST_NEW_SUB_CATEGORY,
  baseURL,
  GET_ALL_SUB_CATEGORY_BY_CATID,
  GET_ALL_SUB_CATEGORY,
  EDIT_CATEGORY,
} from "Components/helpers/url_helper";
import axios from "axios";
import {
  api_is_error,
  api_is_loading,
  api_is_sub_success,
  api_is_success,
} from "./reducer";

export const GetAllCategory = () => async (dispatch: any) => {
  try {
    const options = {
      method: "GET",
      url: `${baseURL}${GET_ALL_CATEGORY}`,
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
export const GetAllSubCategoryById = (id: any) => async (dispatch: any) => {
  try {
    const options = {
      method: "GET",
      url: `${baseURL}${GET_ALL_SUB_CATEGORY_BY_CATID}/${id}`,
    };
    const apifetch = await axios.request(options);
    const response: any = await apifetch;
    console.log("responseL", response);
    dispatch(api_is_sub_success(response));
    return response;
  } catch (error) {
    dispatch(api_is_error(error));

    return error;
  }
};
export const GetAllSubCategory = () => async (dispatch: any) => {
  try {
    const options = {
      method: "GET",
      url: `${baseURL}${GET_ALL_SUB_CATEGORY}`,
    };
    const apifetch = await axios.request(options);
    const response: any = await apifetch;

    dispatch(api_is_sub_success(response));
    return response;
  } catch (error) {
    dispatch(api_is_error(error));

    return error;
  }
};

export const PostCategory = (values: any) => async (dispatch: any) => {
  try {
    const form = new FormData();
    form.append("categoryName", values.categoryName);
    form.append("categoryImage", values.images);
    form.append("status", "true");
    form.append("subCategory", "[]");
    form.append("categoryDescription", values.categoryDescription);

    const options = {
      method: "POST",
      url: `${baseURL}${POST_NEW_CATEGORY}`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: form,
    };
    dispatch(api_is_loading(true));

    const apifetch = await axios.request(options);
    dispatch(api_is_loading(true));
    const response: any = await apifetch;
    dispatch(api_is_loading(false));
    if (response.status === 1) {
      Swal.fire({
        title: "Good job!",
        text: response.message,
        icon: "success",
      }).then(() => {
        dispatch(GetAllCategory());
      });
    } else {
      Swal.fire({
        title: "Success",
        text: response.message,
        icon: "success",
      });
      dispatch(GetAllCategory());
    }
    return response;
  } catch (error: any) {
    Swal.fire({
      title: "error!",
      text: error,
      icon: "error",
    });
    dispatch(api_is_error(error));
  }
};
export const EditCategory =
  (id: any, values: any, router: any) => async (dispatch: any) => {
    try {
      const form = new FormData();
      form.append("categoryName", values.categoryName);
      form.append("categoryImage", values.images);
      form.append("categoryDescription", values.categoryDescription);

      const options = {
        method: "PATCH",
        url: `${baseURL}${EDIT_CATEGORY}/${id}`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: form,
      };
      dispatch(api_is_loading(true));

      const apifetch = await axios.request(options);
      dispatch(api_is_loading(true));
      const response: any = await apifetch;
      dispatch(api_is_loading(false));
      if (response.status === 1) {
        Swal.fire({
          title: "Good job!",
          text: response.message,
          icon: "success",
        }).then(() => {
          dispatch(GetAllCategory());
        });
      } else {
        Swal.fire({
          title: "Success",
          text: response.message,
          icon: "success",
        }).then(() => {
          router.push("/category");
          dispatch(GetAllCategory());
        });
      }
      return response;
    } catch (error: any) {
      Swal.fire({
        title: "error!",
        text: error,
        icon: "error",
      });
      dispatch(api_is_error(error));
    }
  };
export const PostSubCategory = (values: any) => async (dispatch: any) => {
  try {
    const form = new FormData();
    form.append("subCategoryName", values.subCategoryName);
    form.append("subCategoryImage", values.subCategoryImage);
    form.append("status", "true");
    form.append("subSubCategory", "[]");
    form.append("subCategoryDescription", values.subCategoryDescription);

    const options = {
      method: "POST",
      url: `${baseURL}${POST_NEW_SUB_CATEGORY}/${values.categoryId}`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: form,
    };
    dispatch(api_is_loading(true));

    const apifetch = await axios.request(options);
    dispatch(api_is_loading(true));
    const response: any = await apifetch;
    dispatch(api_is_loading(false));
    if (response.status === 1) {
      Swal.fire({
        title: "Good job!",
        text: response.message,
        icon: "success",
      }).then(() => {
        dispatch(GetAllSubCategory());
      });
    } else {
      Swal.fire({
        title: "error",
        text: response.message,
        icon: "error",
      });
      dispatch(api_is_error(response));
    }
    return response;
  } catch (error: any) {
    Swal.fire({
      title: "error!",
      text: error,
      icon: "error",
    });
    dispatch(api_is_error(error));
  }
};

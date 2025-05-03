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
import Factory from "Components/APIFactory/Factory";
import Swal from "sweetalert2";
import { apiError } from "../auth/login/reducer";
import { fetchPipelineByIdOfManager } from "../pipeline/thunk";
export const fetchAllUser = () => async (dispatch: any) => {
  var rolesArray: any = [];

  try {
    dispatch(api_is_userdata_loading(true));
    const fetch_api = axios.get(`${hrms_api_host}${GET_ALL_USER}`);
    const data: any = await fetch_api;
    dispatch(api_is_userdata_success(data));
    if (localStorage.getItem("authUser")) {
      const obj: any = JSON.parse(localStorage.getItem("authUser") || "");
      const currentrole: any = JSON.parse(
        localStorage.getItem("currentrole") || ""
      );
      var id: any = "";
      var RecruiTmanagerId: any = [];
      const uniqueArray: any = [];
      var idsArray: any = [];

      if (currentrole[0].role === "GENERALMANAGER") {
        console.log("GENMGR for Pipeline");
        var rolesArray: any = [];

        for (let index = 0; index < data.length; index++) {
          const element = data[index];

          for (var role of element.roles) {
            rolesArray.push({
              ...element,
              roles: role === null ? "" : role.id,
              managerId: element.manager === null ? "" : element.manager.id,
            });
          }
        }
        var amIdArray: any = [];
        rolesArray
          .filter((ite: any) => ite.managerId === obj.id)
          .map((item: any) => amIdArray.push(item.id));

        var tlIdArray: any = [];

        for (let index = 0; index < amIdArray.length; index++) {
          const element = amIdArray[index];
          rolesArray
            .filter((ite: any, index: any) => ite.managerId === element)
            .map((item: any) => tlIdArray.push(item.id));
        }

        var RecruiterId: any = [];

        for (let index = 0; index < tlIdArray.length; index++) {
          const element = tlIdArray[index];
          rolesArray
            .filter((ite: any, index: any) => ite.managerId === element)
            .map((item: any) => RecruiterId.push(item.id));
        }

        idsArray.push(...amIdArray, ...tlIdArray, ...RecruiterId);
        dispatch(fetchPipelineByIdOfManager(idsArray));
        return idsArray;
      } else if (currentrole[0].role === "ACCOUNTMANAGER") {
        var rolesArray: any = [];

        for (let index = 0; index < data.length; index++) {
          const element = data[index];

          for (var role of element.roles) {
            rolesArray.push({
              ...element,
              roles: role === null ? "" : role.id,
              managerId: element.manager === null ? "" : element.manager.id,
            });
          }
        }
        var tlIdArray: any = [];
        rolesArray
          .filter((ite: any) => ite.managerId === obj.id)
          .map((item: any) => tlIdArray.push(item.id));

        var RecruiterId: any = [];

        for (let index = 0; index < tlIdArray.length; index++) {
          const element = tlIdArray[index];
          rolesArray
            .filter((ite: any, index: any) => ite.managerId === element)
            .map((item: any) => RecruiterId.push(item.id));
        }

        idsArray.push(...tlIdArray, ...RecruiterId);
        return dispatch(fetchPipelineByIdOfManager(idsArray));
      } else {
        var rolesArray: any = [];

        for (let index = 0; index < data.length; index++) {
          const element = data[index];

          for (var role of element.roles) {
            rolesArray.push({
              ...element,
              roles: role === null ? "" : role.id,
              managerId: element.manager === null ? "" : element.manager.id,
            });
          }
        }
        var RecruiterId: any = [];

        rolesArray
          .filter((ite: any) => ite.managerId === obj.id)
          .map((item: any) => RecruiterId.push(item.id));

        idsArray.push(...RecruiterId);
        return dispatch(fetchPipelineByIdOfManager(RecruiterId));
      }
    }
    return data;
  } catch (error) {
    dispatch(api_is_userdata_error(error));
    return error;
  }
};

export const fetchAllRoles = () => async (dispatch: any) => {
  try {
    var setter: any = [];
    const url = `${hrms_api_host}${GET_ALL_ROLES}`;
    dispatch(api_is_userdata_loading(true));
    const fetch = await Factory("GET", setter, url, {});
    dispatch(api_is_roles_fetched(fetch));
    dispatch(api_is_userdata_loading(false));
  } catch (error) {
    dispatch(api_is_userdata_error(error));
  }
};
export const fetchUserByManagerId = (id: any) => async (dispatch: any) => {
  try {
    var setter: any = [];
    const url = `${hrms_api_host}${MANAGER_BY_ROLE}/${id}`;
    dispatch(api_is_userdata_loading(true));
    const fetch = await Factory("GET", setter, url, {});
    console.log("fetch", fetch);

    dispatch(is_user_manager_success(fetch));
    dispatch(api_is_userdata_loading(false));
  } catch (error) {
    dispatch(api_is_userdata_error(error));
  }
};
export const AddNewUser =
  (values: any, router: any) => async (dispatch: any) => {
    try {
      dispatch(api_is_userdata_loading(true));

      var setter: any = [];
      const url = `${hrms_api_host}${POST_NEW_USER}`;
      const body = {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        manager: values.manager,
        mobileNumber: JSON.stringify(values.mobileNumber),
        password: values.password,
        roles: values.roles,
      };
      dispatch(api_is_userdata_loading(true));

      const fetch: any = await Factory("POST", setter, url, body);
      if (fetch.status === "OK") {
        dispatch(MailSent(fetch.payload, router));
        dispatch(api_is_userdata_loading(false));
        Swal.fire(
          "Success",
          "User added successfully and activation mail has been send to user e-mail address",
          "success"
        ).then(() => {
          // Redirect using router after user clicks "OK"
          router.push("/users/view-user");
        });
      } else {
        Swal.fire({
          title: "Error",
          text: fetch.errors,
          timer: 8000,
        });

        // Display SweetAlert on success
      }
    } catch (error) {
      console.log(error);
      dispatch(api_is_userdata_error(error));
    }
  };

export const MailSent = (values: any, router: any) => async (dispatch: any) => {
  try {
    var setter: any = [];
    const url = `${job_api_host}${MAIL}`;
    const body = {
      email: values.email,
      name: values.fullName,
      link: `${redirect}${values.id}`,
    };

    const fetch: any = await Factory("POST", setter, url, body);
    if (fetch.status === "OK") {
      dispatch(api_is_userdata_success(fetch));
    } else {
      dispatch(api_is_userdata_error(fetch));
    }
    dispatch(api_is_userdata_loading(false));
  } catch (error) {
    console.log(error);
    dispatch(api_is_userdata_error(error));
  }
};

export const EditNewUser =
  (values: any, router: any) => async (dispatch: any) => {
    try {
      dispatch(api_is_userdata_loading(true));
      var setter: any = [];
      const url = `${hrms_api_host}${EDIT_USER}`;
      const body = {
        active: values.status,
        email: values.email,
        firstName: values.firstName,
        id: values.id,
        lastName: values.lastName,
        manager: values.manager,
        mobileNumber: values.mobileNumber,
        password: values.password,
        profilePicture: "string",
        roles: values.roles,
        userType: "INTERNAL",
      };
      dispatch(api_is_userdata_loading(true));
      const fetch: any = await Factory("PATCH", setter, url, body);
      dispatch(api_is_userdata_loading(true));
      if (fetch.status === "OK") {
        dispatch(api_is_userdata_loading(false));
        Swal.fire("Success", "User edited successfully", "success").then(() => {
          router.push("/users/view-user");
        });
      } else {
        dispatch(api_is_userdata_loading(false));
        Swal.fire({ title: "Error", text: fetch.errors, timer: 2000 });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const ResetPassword =
  (values: any, router: any, id: any) => async (dispatch: any) => {
    try {
      const options: any = {
        method: "PATCH",
        url: `${hrms_api_host}${POST_RESET_}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          newPassword: values.password,
          userId: id,
        },
      };
      const response: any = await axios.request(options);
      if (response.status === "OK") {
        console.log(response);
        Swal.fire(
          "Success",
          "Password has been reset successfully ",
          "success"
        ).then(() => {
          // Redirect using router after user clicks "OK"
          // router.push("/auth/login", undefined, { shallow: true });
        });
      } else {
        Swal.fire({
          title: "Error",
          text: response.errors,
          timer: 8000,
        });
      }
      return response;
    } catch (error) {
      dispatch(apiError(error));
    }
  };

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postJwtLogin,
  postSocialLogin,
} from "../../../helpers/fakebackend_helper";
import {
  loginSuccess,
  logoutUserSuccess,
  apiError,
  reset_login_flag,
} from "./reducer";
import {
  GET_ALL_JOBS,
  POST_LOGIN,
  hrms_api_host,
  job_api_host,
} from "Components/helpers/url_helper";
import axios from "axios";

export const UserLogin = (user: any, router: any) => async (dispatch: any) => {
  try {
    const options: any = {
      method: "POST",
      url: `${hrms_api_host}${POST_LOGIN}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: { email: user.email, password: user.password },
    };
    const response: any = await axios.request(options);

    if (response.status === "success") {
      document.cookie = `authUser=${JSON.stringify(response)}; path=/`;
      document.cookie = `id=${JSON.stringify(response._id)}; path=/`;
      localStorage.setItem("authUser", JSON.stringify(response));
    localStorage.setItem("id", JSON.stringify(response.id));

      if (response.email && response.password) {
        dispatch(loginSuccess(response));
        router.push("/dashboard", undefined, { shallow: true });
      } else {
        dispatch(apiError(response));
      }
    } else {
      dispatch(apiError(response));
    }
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const logoutUser = () => async (dispatch: any) => {
  // try {

  localStorage.removeItem("authUser");

  // if (process.env.NEXT_PUBLIC_DEFAULTAUTH === "firebase") {
  //   const response = fireBaseBackend.logout;
  //   dispatch(logoutUserSuccess(response));
  // } else {
  //   dispatch(logoutUserSuccess(true));
  // }
  // } catch (error) {
  //   dispatch(apiError(error));
  // }
};

export const socialLogin = (data: any, type: any) => async (dispatch: any) => {
  try {
    let response;

    if (process.env.NEXT_PUBLIC_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      response = fireBaseBackend.socialLoginUser(data, type);
    } else {
      response = postSocialLogin(data);
    }

    const socialdata = await response;

    if (socialdata) {
      localStorage.setItem("authUser", JSON.stringify(response));
      dispatch(loginSuccess(response));
      window.location.pathname = "/";
    }
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const resetLoginFlag = () => async (dispatch: any) => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};

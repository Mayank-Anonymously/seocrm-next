//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
} from "../../../helpers/fakebackend_helper";

import { loginSuccess, logoutUserSuccess, apiError, reset_login_flag } from './reducer';
import { baseURL } from "Components/helpers/url_helper";

const fireBaseBackend = getFirebaseBackend();

export const loginUser = (user: any, router: any) => async (dispatch: any) => {
  // try {
    const response = await fetch(`${baseURL}/auth/login/crm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });

    const data = await response.json();
    console.log(data);
   
    if (data.status) {
      localStorage.setItem('authUser', JSON.stringify( {
        uid: 1,
        username: "Admin",
        role: "Admin",
        password: data.password,
        email: data.email,
      },));
      dispatch(loginSuccess({
        uid: 1,
        username: "Admin",
        role: "Admin",
        password: data.password,
        email: data.email,
      }));
      router.push('/dashboard', undefined, { shallow: true });
    } else {
      dispatch(apiError(data.message || 'Login failed'));
    }
  // } catch (error: any) {
  //   dispatch(apiError(error.message || 'Something went wrong'));
  // }
};


export const logoutUser = () => async (dispatch: any) => {
  try {
    localStorage.removeItem("authUser");

    if (process.env.NEXT_PUBLIC_DEFAULTAUTH === "firebase") {
      const response = fireBaseBackend.logout;
      dispatch(logoutUserSuccess(response));
    } else {
      dispatch(logoutUserSuccess(true));
    }

  } catch (error) {
    dispatch(apiError(error));
  }
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
      window.location.pathname = "/"
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
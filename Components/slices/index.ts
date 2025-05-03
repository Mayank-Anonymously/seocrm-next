import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";


// Authentication
import LoginReducer from "./auth/login/reducer";
import AccountReducer from "./auth/register/reducer";
import ForgetPasswordReducer from "./auth/forgetpwd/reducer";
import ProfileReducer from "./auth/profile/reducer";
import vmsSlice from "./vms/reducers";
import userSlice from "./user/reducers";
import managerSlice from "./auth/manager/reducer";
import customerQuery from "./client/reducer";

const combinedReducer = combineReducers({

  Login: LoginReducer,
  Account: AccountReducer,
  ForgetPassword: ForgetPasswordReducer,
  Profile: ProfileReducer,

  VMS: vmsSlice,
  user: userSlice,
  
  managerFeed: managerSlice,
  customer: customerQuery,
  

});

export const store = configureStore({
  reducer: combinedReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

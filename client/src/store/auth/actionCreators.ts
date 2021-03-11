/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IUser } from "tools/interfaces";
import { removeToken } from "tools";
import { ActionTypes } from "./actionTypes";

export default {
  startAuth: () => {
    return { type: ActionTypes.AUTH_START } as const;
  },
  failAuth: (error: string) => {
    return { type: ActionTypes.AUTH_FAIL, payload: { error } } as const;
  },
  regSuccess: (user: IUser) => {
    return { type: ActionTypes.REGISTRATION_SUCCESS, payload: { user } } as const;
  },
  loginSuccess: (user: IUser) => {
    return { type: ActionTypes.LOGIN_SUCCESS, payload: { user } } as const;
  },
  logout: () => {
    removeToken();
    return { type: ActionTypes.LOGOUT } as const;
  },
  fetchUserStart: () => {
    return { type: ActionTypes.FETCH_USER_START } as const;
  },
  fetchUserFail: (error: string) => {
    return { type: ActionTypes.FETCH_USER_FAIL, payload: { error } } as const;
  },
  fetchUserSuccess: (user: IUser) => {
    return { type: ActionTypes.FETCH_USER_SUCCESS, payload: { user } } as const;
  },
  changePasswordStart: () => {
    return { type: ActionTypes.CHANGE_PASSWORD_START } as const;
  },
  changePasswordFail: (error: string) => {
    return { type: ActionTypes.CHANGE_PASSWORD_FAIL, payload: { error } } as const;
  },
  changePasswordSuccess: () => {
    return { type: ActionTypes.CHANGE_PASSWORD_SUCCESS } as const;
  },
};

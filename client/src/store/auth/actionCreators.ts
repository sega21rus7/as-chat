import { jsonFetch } from "tools";
import { IUser } from "tools/interfaces";
import {
  ActionTypes,
  AuthStartActionType,
  AuthFailActionType,
  RegistrationSuccessActionType,
  LoginSuccessActionType,
  LogoutActionType,
  fetchUserStartActionType,
  fetchUserSuccessActionType,
  fetchUserFailActionType,
  CommonActionType,
} from "./interfaces";
import { Dispatch } from "react";
import { message } from "antd";
import { removeToken } from "tools";

export const startAuth = (): AuthStartActionType => {
  return { type: ActionTypes.AUTH_START };
};

const failAuth = (error: string): AuthFailActionType => {
  return {
    type: ActionTypes.AUTH_FAIL,
    payload: { error },
  };
};

const regSuccess = (user: IUser): RegistrationSuccessActionType => {
  return {
    type: ActionTypes.REGISTRATION_SUCCESS,
    payload: { user },
  };
};

const loginSuccess = (user: IUser): LoginSuccessActionType => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    payload: { user },
  };
};

export const logout = (): LogoutActionType => {
  removeToken();
  return {
    type: ActionTypes.LOGOUT,
  };
};

export const register = (login: string, email: string, password: string, repeatPassword: string) => {
  return async (dispatch: Dispatch<CommonActionType>): Promise<void> => {
    try {
      dispatch(startAuth());
      const { user } = await jsonFetch<IUser>("/api/auth/register", {
        login, email, password, repeatPassword,
      });
      dispatch(regSuccess(user));
    } catch (err) {
      message.error(err.message || err);
      dispatch(failAuth(err.message || err));
    }
  };
};

export const login = (login: string, password: string) => {
  return async (dispatch: Dispatch<CommonActionType>): Promise<void> => {
    try {
      dispatch(startAuth());
      const { user } = await jsonFetch<IUser>("/api/auth/login", {
        login, password,
      });
      dispatch(loginSuccess(user));
    } catch (err) {
      message.error(err.message || err);
      dispatch(failAuth(err.message || err));
    }
  };
};

const fetchUserStart = (): fetchUserStartActionType => {
  return {
    type: ActionTypes.FETCH_USER_START,
  };
};

const fetchUserFail = (error: string): fetchUserFailActionType => {
  return { type: ActionTypes.FETCH_USER_FAIL, payload: { error } };
};

const fetchUserSuccess = (user: IUser): fetchUserSuccessActionType => {
  return { type: ActionTypes.FETCH_USER_SUCCESS, payload: { user } };
};

export const fetchUser = () => {
  return async (dispatch: Dispatch<CommonActionType>): Promise<void> => {
    try {
      dispatch(fetchUserStart());
      const { user } = await jsonFetch<IUser>("/api/auth/getUser");
      dispatch(fetchUserSuccess(user));
    } catch (err) {
      message.error(err.message || err);
      dispatch(fetchUserFail(err.message || err));
    }
  };
};


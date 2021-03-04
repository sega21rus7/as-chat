import { jsonFetch } from "tools";
import { UserType } from "tools/interfaces";
import {
  ActionTypes,
  AuthStartActionType,
  AuthFailActionType,
  RegistrationSuccessActionType,
  LoginSuccessActionType,
  LogoutActionType,
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

const regSuccess = (user: UserType): RegistrationSuccessActionType => {
  return {
    type: ActionTypes.REGISTRATION_SUCCESS,
    payload: { user },
  };
};

const loginSuccess = (user: UserType): LoginSuccessActionType => {
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
      const { user } = await jsonFetch("/api/auth/register", {
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
      const { user } = await jsonFetch("/api/auth/login", {
        login, password,
      });
      dispatch(loginSuccess(user));
    } catch (err) {
      message.error(err.message || err);
      dispatch(failAuth(err.message || err));
    }
  };
};

export const fetchUser = () => {
  return async (dispatch: Dispatch<LoginSuccessActionType>): Promise<void> => {
    try {
      const { user } = await jsonFetch("/api/auth/getUser");
      dispatch(loginSuccess(user));
      // eslint-disable-next-line no-empty
    } catch (err) {

    }
  };
};


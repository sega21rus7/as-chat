import { IUser } from "tools/interfaces";

export enum ActionTypes {
  AUTH_START = "AUTH:AUTH_START",
  AUTH_FAIL = "AUTH:AUTH_FAIL",
  REGISTRATION_SUCCESS = "AUTH:REGISTRATION_SUCCESS",
  LOGIN_SUCCESS = "AUTH:LOGIN_SUCCESS",
  LOGOUT = "AUTH:LOGOUT",
}
export interface AuthStartActionType {
  type: ActionTypes.AUTH_START
}

export interface AuthFailActionType {
  type: ActionTypes.AUTH_FAIL,
  payload: {
    error: string;
  }
}

export interface RegistrationSuccessActionType {
  type: ActionTypes.REGISTRATION_SUCCESS,
  payload: {
    user: IUser;
  }
}

export interface LoginSuccessActionType {
  type: ActionTypes.LOGIN_SUCCESS,
  payload: {
    user: IUser;
  }
}

export interface LogoutActionType {
  type: ActionTypes.LOGOUT
}

export type CommonActionType =
  AuthStartActionType |
  AuthFailActionType |
  RegistrationSuccessActionType |
  LoginSuccessActionType |
  LogoutActionType;
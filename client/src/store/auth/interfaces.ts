export enum ActionTypes {
  AUTH_START = "AUTH/AUTH_START",
  AUTH_FAIL = "AUTH/AUTH_FAIL",
  REGISTRATION_SUCCESS = "AUTH/REGISTRATION_SUCCESS",
  LOGIN_SUCCESS = "AUTH/LOGIN_SUCCESS"
}

interface UserType {
  _id: string;
  email: string;
  login: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
}

export interface StateType {
  user: UserType;
  error: string;
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
    user: UserType;
  }
}

export interface LoginSuccessActionType {
  type: ActionTypes.LOGIN_SUCCESS,
  payload: {
    user: UserType;
  }
}

export type CommonActionType =
  AuthStartActionType |
  AuthFailActionType |
  RegistrationSuccessActionType |
  LoginSuccessActionType;
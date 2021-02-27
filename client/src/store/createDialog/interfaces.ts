import { UserType } from "tools/interfaces";

export enum ActionTypes {
  FETCH_USERS_START = "AUTH:FETCH_USERS_START",
  FETCH_USERS_SUCCESS = "AUTH:FETCH_USERS_SUCCESS",
  FETCH_USERS_FAIL = "AUTH:FETCH_USERS_FAIL",
}

export interface StateType {
  users: UserType[] | null;
  error: string;
}

export interface FetchUsersStartActionType {
  type: ActionTypes.FETCH_USERS_START,
}

export interface FetchUsersSuccessActionType {
  type: ActionTypes.FETCH_USERS_SUCCESS,
  payload: {
    users: UserType[];
  }
}

export interface FetchUsersFailActionType {
  type: ActionTypes.FETCH_USERS_FAIL,
  payload: {
    error: string;
  }
}

export type CommonActionType =
  FetchUsersStartActionType |
  FetchUsersSuccessActionType |
  FetchUsersFailActionType;
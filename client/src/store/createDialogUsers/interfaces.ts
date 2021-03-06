import { IUser } from "tools/interfaces";

export enum ActionTypes {
  FETCH_USERS_START = "CREATE_DIALOG_USERS:FETCH_USERS_START",
  FETCH_USERS_SUCCESS = "CREATE_DIALOG_USERS:FETCH_USERS_SUCCESS",
  FETCH_USERS_FAIL = "CREATE_DIALOG_USERS:FETCH_USERS_FAIL",
}

export interface FetchUsersStartActionType {
  type: ActionTypes.FETCH_USERS_START,
}

export interface FetchUsersSuccessActionType {
  type: ActionTypes.FETCH_USERS_SUCCESS,
  payload: {
    users: IUser[];
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
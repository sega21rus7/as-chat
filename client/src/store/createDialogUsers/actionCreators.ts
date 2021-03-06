import { jsonFetch } from "tools";
import { UserType } from "tools/interfaces";
import {
  ActionTypes,
  FetchUsersFailActionType,
  FetchUsersStartActionType,
  FetchUsersSuccessActionType,
  CommonActionType,
} from "./interfaces";
import { Dispatch } from "react";

const startFetchUsers = (): FetchUsersStartActionType => {
  return { type: ActionTypes.FETCH_USERS_START };
};

const failFetchUsers = (error: string): FetchUsersFailActionType => {
  return { type: ActionTypes.FETCH_USERS_FAIL, payload: { error } };
};

const successFetchUsers = (users: UserType[]): FetchUsersSuccessActionType => {
  return { type: ActionTypes.FETCH_USERS_SUCCESS, payload: { users } };
};

export const fetchUsers = () => {
  return async (dispatch: Dispatch<CommonActionType>): Promise<void> => {
    try {
      dispatch(startFetchUsers());
      const users = await jsonFetch<UserType[]>("/api/auth/users", undefined, { method: "GET" });
      dispatch(successFetchUsers(users));
    } catch (err) {
      dispatch(failFetchUsers(err.message || err));
    }
  };
};
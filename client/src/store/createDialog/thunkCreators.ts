import { jsonFetch } from "tools";
import { ThunkType } from "./types";
import actionCreators from "./actionCreators";
import { message } from "antd";
import { IUser } from "tools/interfaces";

export const fetchUsers = (): ThunkType => {
  return async dispatch => {
    try {
      dispatch(actionCreators.startFetchUsers());
      const { users } = await jsonFetch<IUser[]>("/api/auth/users", undefined, { method: "GET" });
      dispatch(actionCreators.successFetchUsers(users));
    } catch (err) {
      message.error(err.message || err);
      dispatch(actionCreators.failFetchUsers(err.message || err));
    }
  };
};

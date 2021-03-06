/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IUser } from "tools/interfaces";
import { ActionTypes } from "./actionTypes";

export default {
  startFetchUsers: () => {
    return { type: ActionTypes.FETCH_USERS_START } as const;
  },
  failFetchUsers: (error: string) => {
    return { type: ActionTypes.FETCH_USERS_FAIL, payload: { error } } as const;
  },
  successFetchUsers: (users: IUser[]) => {
    return { type: ActionTypes.FETCH_USERS_SUCCESS, payload: { users } } as const;
  },
};
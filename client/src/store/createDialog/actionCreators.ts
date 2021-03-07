/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IUser } from "tools/interfaces";
import { ActionTypes } from "./actionTypes";
import { FilterTypes } from "./types";

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
  showAll: () => {
    return { type: ActionTypes.FILTER, payload: { type: FilterTypes.SHOW_ALL, key: "" } } as const;
  },
  showByFullName: (key: string) => {
    return { type: ActionTypes.FILTER, payload: { type: FilterTypes.SHOW_BY_FULLNAME, key } } as const;
  },
};
/* eslint-disable indent */
import { IUser } from "tools/interfaces";
import { Nullable } from "tools/types";
import { ActionTypes } from "./actionTypes";
import { ActionCreatorTypes, FilterTypes } from "./types";

const initialState = {
  users: null as Nullable<IUser[]>,
  error: "",
  filter: {
    key: "",
    type: FilterTypes.SHOW_ALL as FilterTypes,
  },
};

export type StateType = typeof initialState;

const createDialogReducer = (state = initialState, action: ActionCreatorTypes): StateType => {
  switch (action.type) {
    case ActionTypes.FETCH_USERS_FAIL:
      return { ...state, error: action.payload.error };
    case ActionTypes.FETCH_USERS_SUCCESS:
      return { ...state, users: action.payload.users };
    case ActionTypes.FILTER:
      return { ...state, filter: { ...action.payload } };
    default:
      return state;
  }
};

export default createDialogReducer;
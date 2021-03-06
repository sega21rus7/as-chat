/* eslint-disable indent */
import { IUser } from "tools/interfaces";
import { Nullable } from "tools/types";
import { CommonActionType, ActionTypes } from "./interfaces";

const initialState = {
  users: null as Nullable<IUser[]>,
  error: "",
};

type StateType = typeof initialState;

const createDialogReducer = (state = initialState, action: CommonActionType): StateType => {
  switch (action.type) {
    case ActionTypes.FETCH_USERS_FAIL:
      return { ...state, error: action.payload.error };
    case ActionTypes.FETCH_USERS_SUCCESS:
      return { ...state, users: action.payload.users };
    default:
      return state;
  }
};

export default createDialogReducer;
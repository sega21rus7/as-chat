/* eslint-disable indent */
import { CommonActionType, ActionTypes } from "./interfaces";
import { IUser } from "tools/interfaces";
import { Nullable } from "tools/types";

const initialState = {
  user: null as Nullable<IUser>,
  error: "",
};

type StateType = typeof initialState;

const authReducer = (state = initialState, action: CommonActionType): StateType => {
  switch (action.type) {
    case ActionTypes.AUTH_START:
      return initialState;
    case ActionTypes.REGISTRATION_SUCCESS:
      return { ...state, user: action.payload.user };
    case ActionTypes.LOGIN_SUCCESS:
      return { ...state, user: action.payload.user };
    case ActionTypes.AUTH_FAIL:
      return { ...state, error: action.payload.error };
    case ActionTypes.LOGOUT:
      return { ...state, user: null, error: "" };
    default:
      return state;
  }
};

export default authReducer;
/* eslint-disable indent */
import { CommonActionType, ActionTypes } from "./interfaces";
import { IUser } from "tools/interfaces";
import { Nullable } from "tools/types";

const initialState = {
  user: null as Nullable<IUser>,
  authError: "",
  fetchUserError: "",
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
      return { ...state, authError: action.payload.error };
    case ActionTypes.LOGOUT:
      return initialState;
    case ActionTypes.FETCH_USER_FAIL:
      return { ...state, fetchUserError: action.payload.error };
    case ActionTypes.FETCH_USER_SUCCESS:
      return { ...state, user: action.payload.user };
    default:
      return state;
  }
};

export default authReducer;
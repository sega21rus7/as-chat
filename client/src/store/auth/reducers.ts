/* eslint-disable indent */
import { ActionTypes } from "./actionTypes";
import { IUser } from "tools/interfaces";
import { Nullable } from "tools/types";
import { ActionCreatorTypes } from "./types";

const initialState = {
  user: null as Nullable<IUser>,
  authError: "",
  authLoading: false,
  fetchUserError: "",
  changePasswordError: "",
  userOnline: false,
};

type StateType = typeof initialState;

const authReducer = (state = initialState, action: ActionCreatorTypes): StateType => {
  switch (action.type) {
    case ActionTypes.AUTH_START:
      return { ...state, authLoading: true };
    case ActionTypes.REGISTRATION_SUCCESS:
      return { ...state, user: action.payload.user, authLoading: false, authError: "" };
    case ActionTypes.LOGIN_SUCCESS:
      return { ...state, user: action.payload.user, authLoading: false, authError: "" };
    case ActionTypes.AUTH_FAIL:
      return { ...state, authError: action.payload.error, authLoading: false };
    case ActionTypes.LOGOUT:
      return initialState;
    case ActionTypes.FETCH_USER_FAIL:
      return { ...state, fetchUserError: action.payload.error };
    case ActionTypes.FETCH_USER_SUCCESS:
      return { ...state, user: action.payload.user, fetchUserError: "" };
    case ActionTypes.CHANGE_PASSWORD_FAIL:
      return { ...state, changePasswordError: action.payload.error };
    case ActionTypes.CHANGE_PASSWORD_SUCCESS:
      return { ...state, changePasswordError: "" };
    case ActionTypes.SET_USER_ONLINE:
      return { ...state, userOnline: action.payload.status };
    default:
      return state;
  }
};

export default authReducer;
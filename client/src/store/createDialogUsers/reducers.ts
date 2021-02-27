/* eslint-disable indent */
import { StateType, CommonActionType, ActionTypes } from "./interfaces";

const initialState: StateType = {
  users: null,
  error: "",
};

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
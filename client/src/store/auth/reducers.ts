/* eslint-disable indent */
import { StateType, CommonActionType, ActionTypes } from "./interfaces";

const initialState: StateType = {
  user: {
    login: "alexey",
    firstName: "Алексей",
    lastName: "Медведев",
    email: "",
    _id: "",
  },
  error: "",
};

const authReducer = (state = initialState, action: CommonActionType): StateType => {
  switch (action.type) {
    case ActionTypes.REGISTRATION_SUCCESS:
      return { ...state, user: action.payload.user };
    case ActionTypes.LOGIN_SUCCESS:
      return { ...state, user: action.payload.user };
    case ActionTypes.AUTH_FAIL:
      return { ...state, error: action.payload.error };
    default:
      return state;
  }
};

export default authReducer;
/* eslint-disable indent */
import { StateType, CommonActionType, ActionTypes } from "./interfaces";

const initialState: StateType = {
  items: [],
  error: "",
};

const dialogsReducer = (state = initialState, action: CommonActionType): StateType => {
  switch (action.type) {
    case ActionTypes.FETCH_DIALOGS_FAIL:
      return { ...state, error: action.payload.error };
    case ActionTypes.FETCH_DIALOGS_SUCCESS:
      return { ...state, items: action.payload.items };
    default:
      return state;
  }
};

export default dialogsReducer;
/* eslint-disable indent */
import { StateType, CommonActionType, ActionTypes } from "./interfaces";

const initialState: StateType = {
  items: [],
  error: "",
  currentDialog: null,
};

const dialogsReducer = (state = initialState, action: CommonActionType): StateType => {
  switch (action.type) {
    case ActionTypes.FETCH_DIALOGS_FAIL:
      return { ...state, error: action.payload.error };
    case ActionTypes.FETCH_DIALOGS_SUCCESS:
      return { ...state, items: action.payload.items };
    case ActionTypes.SET_CURRENT_DIALOG:
      return { ...state, currentDialog: action.payload.dialog };
    default:
      return state;
  }
};

export default dialogsReducer;
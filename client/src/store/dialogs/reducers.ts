/* eslint-disable indent */
import { StateType, CommonActionType, ActionTypes } from "./interfaces";

const initialState: StateType = {
  items: [],
  fetchDialogsError: "",
  currentDialog: null,
  postDialogError: "",
};

const dialogsReducer = (state = initialState, action: CommonActionType): StateType => {
  switch (action.type) {
    case ActionTypes.FETCH_DIALOGS_FAIL:
      return { ...state, fetchDialogsError: action.payload.error };
    case ActionTypes.FETCH_DIALOGS_SUCCESS:
      return { ...state, items: action.payload.items };
    case ActionTypes.SET_CURRENT_DIALOG:
      return { ...state, currentDialog: action.payload.dialog };
    case ActionTypes.ADD_DIALOG:
      return { ...state, items: [...state.items, action.payload.item] };
    case ActionTypes.POST_DIALOG_FAIL:
      return { ...state, postDialogError: action.payload.error };
    default:
      return state;
  }
};

export default dialogsReducer;
/* eslint-disable indent */
import { IDialog } from "tools/interfaces";
import { Nullable } from "tools/types";
import { FilterTypes } from "./types";
import { ActionTypes } from "./actionTypes";
import { ActionCreatorTypes } from "./types";

const initialState = {
  items: null as Nullable<IDialog[]>,
  fetchDialogsError: "",
  currentDialog: null as Nullable<IDialog>,
  postDialogError: "",
  filter: {
    key: "",
    type: FilterTypes.SHOW_ALL as FilterTypes,
  },
};

export type StateType = typeof initialState;

const dialogsReducer = (state = initialState, action: ActionCreatorTypes): StateType => {
  switch (action.type) {
    case ActionTypes.FETCH_DIALOGS_FAIL:
      return { ...state, fetchDialogsError: action.payload.error };
    case ActionTypes.FETCH_DIALOGS_SUCCESS:
      return { ...state, items: action.payload.items };
    case ActionTypes.SET_CURRENT_DIALOG:
      return { ...state, currentDialog: action.payload.dialog };
    case ActionTypes.ADD_DIALOG:
      return {
        ...state,
        items: [
          ...(state.items ? state.items : []),
          action.payload.item,
        ],
      };
    case ActionTypes.POST_DIALOG_FAIL:
      return { ...state, postDialogError: action.payload.error };
    case ActionTypes.FILTER:
      return { ...state, filter: { ...action.payload } };
    default:
      return state;
  }
};

export default dialogsReducer;
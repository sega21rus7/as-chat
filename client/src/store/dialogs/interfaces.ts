import { IDialog } from "tools/interfaces";

export enum ActionTypes {
  FETCH_DIALOGS_START = "DIALOGS:FETCH_DIALOGS_START",
  FETCH_DIALOGS_FAIL = "DIALOGS:FETCH_DIALOGS_FAIL",
  FETCH_DIALOGS_SUCCESS = "DIALOGS:FETCH_DIALOGS_SUCCESS",
  SET_CURRENT_DIALOG = "DIALOGS:SET_CURRENT_DIALOG",
  ADD_DIALOG = "DIALOGS:ADD_DIALOG",
  POST_DIALOG_START = "DIALOGS:POST_DIALOG_START",
  POST_DIALOG_FAIL = "DIALOGS:POST_DIALOG_FAIL",
  FILTER = "DIALOGS:FILTER",
}

export enum FilterTypes {
  SHOW_ALL = "SHOW_ALL",
  SHOW_BY_FULLNAME = "SHOW_BY_FULLNAME",
}

export interface StateType {
  items: IDialog[];
  fetchDialogsError: string;
  currentDialog: IDialog | null;
  postDialogError: string;
  filter: {
    type: FilterTypes;
    key: string;
  };
}

export interface SetCurrentDialogActionType {
  type: ActionTypes.SET_CURRENT_DIALOG;
  payload: {
    dialog: IDialog | null;
  }
}

export interface FetchDialogsStartActionType {
  type: ActionTypes.FETCH_DIALOGS_START;
}

export interface FetchDialogsFailtActionType {
  type: ActionTypes.FETCH_DIALOGS_FAIL;
  payload: {
    error: string;
  }
}

export interface AddDialogActionType {
  type: ActionTypes.ADD_DIALOG,
  payload: {
    item: IDialog,
  }
}

export interface FetchDialogsSuccessActionType {
  type: ActionTypes.FETCH_DIALOGS_SUCCESS;
  payload: {
    items: IDialog[];
  }
}

export interface PostDialogStartActionType {
  type: ActionTypes.POST_DIALOG_START,
}

export interface PostDialogFailActionType {
  type: ActionTypes.POST_DIALOG_FAIL,
  payload: {
    error: string;
  }
}

export interface FilterActionType {
  type: ActionTypes.FILTER,
  payload: {
    type: FilterTypes;
    key: string;
  }
}

export type CommonActionType =
  FetchDialogsStartActionType |
  FetchDialogsSuccessActionType |
  FetchDialogsFailtActionType |
  SetCurrentDialogActionType |
  AddDialogActionType |
  PostDialogFailActionType |
  PostDialogStartActionType |
  FilterActionType;
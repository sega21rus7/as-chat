import { DialogType } from "tools/interfaces";

export enum ActionTypes {
  FETCH_DIALOGS_START = "DIALOGS:FETCH_DIALOGS_START",
  FETCH_DIALOGS_FAIL = "DIALOGS:FETCH_DIALOGS_FAIL",
  FETCH_DIALOGS_SUCCESS = "DIALOGS:FETCH_DIALOGS_SUCCESS",
  SET_CURRENT_DIALOG = "DIALOGS:SET_CURRENT_DIALOG",
  ADD_DIALOG = "DIALOGS:ADD_DIALOG",
}

export interface StateType {
  items: DialogType[];
  error: string;
  currentDialog: DialogType | null;
}

export interface SetCurrentDialogActionType {
  type: ActionTypes.SET_CURRENT_DIALOG;
  payload: {
    dialog: DialogType;
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
    item: DialogType,
  }
}

export interface FetchDialogsSuccessActionType {
  type: ActionTypes.FETCH_DIALOGS_SUCCESS;
  payload: {
    items: DialogType[];
  }
}

export type CommonActionType =
  FetchDialogsStartActionType |
  FetchDialogsSuccessActionType |
  FetchDialogsFailtActionType |
  SetCurrentDialogActionType |
  AddDialogActionType;
import { UserType } from "tools/interfaces";

export enum ActionTypes {
  FETCH_DIALOGS_START = "DIALOGS:FETCH_DIALOGS_START",
  FETCH_DIALOGS_FAIL = "DIALOGS:FETCH_DIALOGS_FAIL",
  FETCH_DIALOGS_SUCCESS = "DIALOGS:FETCH_DIALOGS_SUCCESS",
  SET_CURRENT_DIALOG = "DIALOGS:SET_CURRENT_DIALOG"
}

interface MessageType {
  hasRead: boolean;
  _id: string;
  author: string;
  text: string;
  updatedAt: Date;
}

export interface ItemType {
  messages: MessageType[],
  _id: string;
  author: UserType;
  companion: UserType;
  updatedAt: Date;
}

export interface StateType {
  items: ItemType[];
  error: string;
  currentDialog: ItemType | null;
}

export interface SetCurrentDialogActionType {
  type: ActionTypes.SET_CURRENT_DIALOG;
  payload: {
    dialog: ItemType;
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

export interface FetchDialogsSuccessActionType {
  type: ActionTypes.FETCH_DIALOGS_SUCCESS;
  payload: {
    items: ItemType[];
  }
}

export type CommonActionType =
  FetchDialogsStartActionType |
  FetchDialogsSuccessActionType |
  FetchDialogsFailtActionType |
  SetCurrentDialogActionType;
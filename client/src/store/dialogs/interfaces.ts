export enum ActionTypes {
  FETCH_DIALOGS_START = "DIALOGS:FETCH_DIALOGS_START",
  FETCH_DIALOGS_FAIL = "DIALOGS:FETCH_DIALOGS_FAIL",
  FETCH_DIALOGS_SUCCESS = "DIALOGS:FETCH_DIALOGS_SUCCESS",
}

interface UserType {
  _id: string;
  email: string;
  login: string;
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
  FetchDialogsFailtActionType;
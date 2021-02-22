import { UserType } from "tools/interfaces";

export enum ActionTypes {
  FETCH_Messages_START = "MESSAGES:FETCH_MESSAGES_START",
  FETCH_Messages_FAIL = "MESSAGES:FETCH_MESSAGES_FAIL",
  FETCH_Messages_SUCCESS = "MESSAGES:FETCH_MESSAGES_SUCCESS",
}

export interface ItemType {
  hasRead: boolean;
  _id: string;
  author: UserType;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StateType {
  items: ItemType[];
  error: string;
}

export interface FetchMessagesStartActionType {
  type: ActionTypes.FETCH_Messages_START;
}

export interface FetchMessagesFailtActionType {
  type: ActionTypes.FETCH_Messages_FAIL;
  payload: {
    error: string;
  }
}

export interface FetchMessagesSuccessActionType {
  type: ActionTypes.FETCH_Messages_SUCCESS;
  payload: {
    items: ItemType[];
  }
}

export type CommonActionType =
  FetchMessagesStartActionType |
  FetchMessagesSuccessActionType |
  FetchMessagesFailtActionType;
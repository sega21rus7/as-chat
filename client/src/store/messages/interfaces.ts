import { MessageType } from "tools/interfaces";

export enum ActionTypes {
  FETCH_Messages_START = "MESSAGES:FETCH_MESSAGES_START",
  FETCH_Messages_FAIL = "MESSAGES:FETCH_MESSAGES_FAIL",
  FETCH_Messages_SUCCESS = "MESSAGES:FETCH_MESSAGES_SUCCESS",
}

export interface StateType {
  items: MessageType[];
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
    items: MessageType[];
  }
}

export type CommonActionType =
  FetchMessagesStartActionType |
  FetchMessagesSuccessActionType |
  FetchMessagesFailtActionType;
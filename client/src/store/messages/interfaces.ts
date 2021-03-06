import { IMessage } from "tools/interfaces";

export enum ActionTypes {
  FETCH_MESSAGES_START = "MESSAGES:FETCH_MESSAGES_START",
  FETCH_MESSAGES_FAIL = "MESSAGES:FETCH_MESSAGES_FAIL",
  FETCH_MESSAGES_SUCCESS = "MESSAGES:FETCH_MESSAGES_SUCCESS",
  ADD_MESSAGE = "MESSAGES:ADD_MESSAGE",
  RESET_MESSAGES = "MESSAGES:RESET_MESSAGES",
  POST_MESSAGE_START = "MESSAGES:POST_MESSAGE_START",
  POST_MESSAGE_FAIL = "MESSAGES:POST_MESSAGE_FAIL",
}
export interface FetchMessagesStartActionType {
  type: ActionTypes.FETCH_MESSAGES_START;
}

export interface FetchMessagesFailtActionType {
  type: ActionTypes.FETCH_MESSAGES_FAIL;
  payload: {
    error: string;
  }
}

export interface FetchMessagesSuccessActionType {
  type: ActionTypes.FETCH_MESSAGES_SUCCESS;
  payload: {
    items: IMessage[];
  }
}

export interface AddMessageActionType {
  type: ActionTypes.ADD_MESSAGE,
  payload: {
    item: IMessage;
  }
}

export interface PostMessageStartActionType {
  type: ActionTypes.POST_MESSAGE_START,
}

export interface PostMessageFailActionType {
  type: ActionTypes.POST_MESSAGE_FAIL,
  payload: {
    error: string;
  }
}

export interface ResetMessagesActionType {
  type: ActionTypes.RESET_MESSAGES,
}

export type CommonActionType =
  FetchMessagesStartActionType |
  FetchMessagesSuccessActionType |
  FetchMessagesFailtActionType |
  AddMessageActionType |
  PostMessageStartActionType |
  PostMessageFailActionType |
  ResetMessagesActionType;
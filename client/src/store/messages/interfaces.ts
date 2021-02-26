import { MessageType } from "tools/interfaces";

export enum ActionTypes {
  FETCH_MESSAGES_START = "MESSAGES:FETCH_MESSAGES_START",
  FETCH_MESSAGES_FAIL = "MESSAGES:FETCH_MESSAGES_FAIL",
  FETCH_MESSAGES_SUCCESS = "MESSAGES:FETCH_MESSAGES_SUCCESS",
  ADD_MESSAGE = "MESSAGES:ADD_MESSAGE",
  POST_MESSAGE_START = "MESSAGES:POST_MESSAGE_START",
  POST_MESSAGE_FAIL = "MESSAGES:POST_MESSAGE_FAIL",
}

export interface StateType {
  items: MessageType[];
  fetchMessagesError: string;
  postMessageError: string;
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
    items: MessageType[];
  }
}

export interface AddMessageActionType {
  type: ActionTypes.ADD_MESSAGE,
  payload: {
    item: MessageType;
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

export type CommonActionType =
  FetchMessagesStartActionType |
  FetchMessagesSuccessActionType |
  FetchMessagesFailtActionType |
  AddMessageActionType |
  PostMessageStartActionType |
  PostMessageFailActionType;
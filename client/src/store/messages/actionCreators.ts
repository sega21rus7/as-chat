import { jsonFetch } from "tools";
import {
  ActionTypes,
  FetchMessagesStartActionType,
  FetchMessagesFailtActionType,
  FetchMessagesSuccessActionType,
  CommonActionType,
  AddMessageActionType,
  PostMessageStartActionType,
  PostMessageFailActionType,
  ResetMessagesActionType,
} from "./interfaces";
import { Dispatch } from "react";
import { IMessage } from "tools/interfaces";
import { message } from "antd";

const startFetchMessages = (): FetchMessagesStartActionType => {
  return { type: ActionTypes.FETCH_MESSAGES_START };
};

const failFetchMessages = (error: string): FetchMessagesFailtActionType => {
  return { type: ActionTypes.FETCH_MESSAGES_FAIL, payload: { error } };
};

const successFetchMessages = (items: IMessage[]): FetchMessagesSuccessActionType => {
  return { type: ActionTypes.FETCH_MESSAGES_SUCCESS, payload: { items } };
};

export const addMessage = (item: IMessage): AddMessageActionType => {
  return { type: ActionTypes.ADD_MESSAGE, payload: { item } };
};

const startPostMessage = (): PostMessageStartActionType => {
  return { type: ActionTypes.POST_MESSAGE_START };
};

const failPostMessage = (error: string): PostMessageFailActionType => {
  return { type: ActionTypes.POST_MESSAGE_FAIL, payload: { error } };
};

export const postMessage = (dialogID: string, text: string) => {
  return async (dispatch: Dispatch<CommonActionType>): Promise<void> => {
    try {
      dispatch(startPostMessage());
      const { message } = await jsonFetch<IMessage>("/api/chat/messages", {
        dialog: dialogID,
        text,
      });
      dispatch(addMessage(message));
    } catch (err) {
      message.error(err.message || err);
      dispatch(failPostMessage(err.message || err));
    }
  };
};

export const fetchMessages = (dialogID: string) => {
  return async (dispatch: Dispatch<CommonActionType>): Promise<void> => {
    try {
      dispatch(startFetchMessages());
      const { messages } = await jsonFetch<IMessage[]>(
        `/api/chat/messages/${dialogID}`, undefined, { method: "GET" },
      );
      dispatch(successFetchMessages(messages));
    } catch (err) {
      message.error(err.message || err);
      dispatch(failFetchMessages(err.message || err));
    }
  };
};

export const resetMessages = (): ResetMessagesActionType => {
  return { type: ActionTypes.RESET_MESSAGES };
};
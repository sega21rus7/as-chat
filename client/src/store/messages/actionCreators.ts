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
} from "./interfaces";
import { Dispatch } from "react";
import { MessageType } from "tools/interfaces";

const startFetchDialogs = (): FetchMessagesStartActionType => {
  return { type: ActionTypes.FETCH_MESSAGES_START };
};

const failFetchDialogs = (error: string): FetchMessagesFailtActionType => {
  return { type: ActionTypes.FETCH_MESSAGES_FAIL, payload: { error } };
};

const successFetchDialogs = (items: MessageType[]): FetchMessagesSuccessActionType => {
  return { type: ActionTypes.FETCH_MESSAGES_SUCCESS, payload: { items } };
};

export const addMessage = (item: MessageType): AddMessageActionType => {
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
      const { message } = await jsonFetch<MessageType>("/api/chat/messages", {
        dialog: dialogID,
        text,
      });
      dispatch(addMessage(message));
    } catch (err) {
      dispatch(failPostMessage(err.message || err));
    }
  };
};

export const fetchMessages = (dialogID: string) => {
  return async (dispatch: Dispatch<CommonActionType>): Promise<void> => {
    try {
      dispatch(startFetchDialogs());
      const { messages } = await jsonFetch<MessageType[]>(
        `/api/chat/messages/${dialogID}`, undefined, { method: "GET" },
      );
      dispatch(successFetchDialogs(messages));
    } catch (err) {
      dispatch(failFetchDialogs(err.message || err));
    }
  };
};
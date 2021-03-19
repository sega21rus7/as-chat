/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IMessage } from "tools/interfaces";
import { ActionTypes } from "./actionTypes";

export default {
  startFetchMessages: () => {
    return { type: ActionTypes.FETCH_MESSAGES_START } as const;
  },
  failFetchMessages: (error: string) => {
    return { type: ActionTypes.FETCH_MESSAGES_FAIL, payload: { error } } as const;
  },
  successFetchMessages: (items: IMessage[]) => {
    return { type: ActionTypes.FETCH_MESSAGES_SUCCESS, payload: { items } } as const;
  },
  addMessage: (item: IMessage) => {
    return { type: ActionTypes.ADD_MESSAGE, payload: { item } } as const;
  },
  startPostMessage: () => {
    return { type: ActionTypes.POST_MESSAGE_START } as const;
  },
  failPostMessage: (error: string) => {
    return { type: ActionTypes.POST_MESSAGE_FAIL, payload: { error } } as const;
  },
  resetMessages: () => {
    return { type: ActionTypes.RESET_MESSAGES } as const;
  },
  startPostDeleteMessage: () => {
    return { type: ActionTypes.POST_DELETE_MESSAGE_START } as const;
  },
  failPostDeleteMessage: (error: string) => {
    return { type: ActionTypes.POST_DELETE_MESSAGE_FAIL, payload: { error } } as const;
  },
  removeMessage: (item: IMessage) => {
    return { type: ActionTypes.REMOVE_MESSAGE, payload: { item } } as const;
  },
};
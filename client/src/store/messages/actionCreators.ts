import { jsonFetch } from "tools";
import {
  ActionTypes,
  FetchMessagesStartActionType,
  FetchMessagesFailtActionType,
  FetchMessagesSuccessActionType,
  CommonActionType,
  ItemType,
} from "./interfaces";
import { Dispatch } from "react";

const startFetchDialogs = (): FetchMessagesStartActionType => {
  return { type: ActionTypes.FETCH_Messages_START };
};

const failFetchDialogs = (error: string): FetchMessagesFailtActionType => {
  return { type: ActionTypes.FETCH_Messages_FAIL, payload: { error } };
};

const successFetchDialogs = (items: ItemType[]): FetchMessagesSuccessActionType => {
  return { type: ActionTypes.FETCH_Messages_SUCCESS, payload: { items } };
};

export const fetchMessages = (dialogID: string) => {
  return async (dispatch: Dispatch<CommonActionType>): Promise<void> => {
    try {
      dispatch(startFetchDialogs());
      const { messages } = await jsonFetch(
        `/api/chat/messages/${dialogID}`, undefined, { method: "GET" },
      );
      dispatch(successFetchDialogs(messages));
    } catch (err) {
      dispatch(failFetchDialogs(err.message || err));
    }
  };
};
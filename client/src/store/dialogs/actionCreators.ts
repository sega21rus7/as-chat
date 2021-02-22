import { jsonFetch } from "tools";
import {
  ActionTypes,
  FetchDialogsStartActionType,
  FetchDialogsFailtActionType,
  FetchDialogsSuccessActionType,
  CommonActionType,
  ItemType,
} from "./interfaces";
import { Dispatch } from "react";

const startFetchDialogs = (): FetchDialogsStartActionType => {
  return { type: ActionTypes.FETCH_DIALOGS_START };
};

const failFetchDialogs = (error: string): FetchDialogsFailtActionType => {
  return { type: ActionTypes.FETCH_DIALOGS_FAIL, payload: { error } };
};

const successFetchDialogs = (items: ItemType[]): FetchDialogsSuccessActionType => {
  return { type: ActionTypes.FETCH_DIALOGS_SUCCESS, payload: { items } };
};

export const fetchDialogs = () => {
  return async (dispatch: Dispatch<CommonActionType>): Promise<void> => {
    try {
      dispatch(startFetchDialogs());
      const { dialogs } = await jsonFetch("/api/chat/dialogs", undefined, { method: "GET" });
      dispatch(successFetchDialogs(dialogs));
    } catch (err) {
      dispatch(failFetchDialogs(err.message || err));
    }
  };
};
import { jsonFetch } from "tools";
import {
  ActionTypes,
  FetchDialogsStartActionType,
  FetchDialogsFailtActionType,
  FetchDialogsSuccessActionType,
  CommonActionType,
  SetCurrentDialogActionType,
  AddDialogActionType,
} from "./interfaces";
import { DialogType } from "tools/interfaces";
import { Dispatch } from "react";

const startFetchDialogs = (): FetchDialogsStartActionType => {
  return { type: ActionTypes.FETCH_DIALOGS_START };
};

const failFetchDialogs = (error: string): FetchDialogsFailtActionType => {
  return { type: ActionTypes.FETCH_DIALOGS_FAIL, payload: { error } };
};

const successFetchDialogs = (items: DialogType[]): FetchDialogsSuccessActionType => {
  return { type: ActionTypes.FETCH_DIALOGS_SUCCESS, payload: { items } };
};

export const setCurrentDialog = (dialog: DialogType): SetCurrentDialogActionType => {
  return { type: ActionTypes.SET_CURRENT_DIALOG, payload: { dialog } };
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

export const addDialog = (item: DialogType): AddDialogActionType => {
  return { type: ActionTypes.ADD_DIALOG, payload: { item } };
};
import { jsonFetch } from "tools";
import {
  ActionTypes,
  FetchDialogsStartActionType,
  FetchDialogsFailtActionType,
  FetchDialogsSuccessActionType,
  CommonActionType,
  SetCurrentDialogActionType,
  AddDialogActionType,
  PostDialogFailActionType,
  PostDialogStartActionType,
  FilterActionType,
  FilterTypes,
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

export const showByFullName = (key: string): FilterActionType => {
  return {
    type: ActionTypes.FILTER,
    payload: { type: FilterTypes.SHOW_BY_FULLNAME, key },
  };
};

export const showAll = (): FilterActionType => {
  return {
    type: ActionTypes.FILTER,
    payload: { type: FilterTypes.SHOW_ALL, key: "" },
  };
};

const startPostDialog = (): PostDialogStartActionType => {
  return { type: ActionTypes.POST_DIALOG_START };
};

const failPostDialog = (error: string): PostDialogFailActionType => {
  return { type: ActionTypes.POST_DIALOG_FAIL, payload: { error } };
};

export const postDialog = (companion: string, messageText: string) => {
  return async (dispatch: Dispatch<CommonActionType>): Promise<void> => {
    try {
      dispatch(startPostDialog());
      const { dialog } = await jsonFetch("/api/chat/dialogs", {
        companion,
        messageText,
      });
      dispatch(addDialog(dialog));
    } catch (err) {
      dispatch(failPostDialog(err.message || err));
    }
  };
};


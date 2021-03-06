/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IDialog } from "tools/interfaces";
import { ActionTypes } from "./actionTypes";
import { FilterTypes } from "./types";

export default {
  startFetchDialogs: () => {
    return { type: ActionTypes.FETCH_DIALOGS_START } as const;
  },
  failFetchDialogs: (error: string) => {
    return { type: ActionTypes.FETCH_DIALOGS_FAIL, payload: { error } } as const;
  },
  successFetchDialogs: (items: IDialog[]) => {
    return { type: ActionTypes.FETCH_DIALOGS_SUCCESS, payload: { items } } as const;
  },
  startPostDialog: () => {
    return { type: ActionTypes.POST_DIALOG_START } as const;
  },
  failPostDialog: (error: string) => {
    return { type: ActionTypes.POST_DIALOG_FAIL, payload: { error } } as const;
  },
  setCurrentDialog: (dialog: IDialog | null) => {
    return { type: ActionTypes.SET_CURRENT_DIALOG, payload: { dialog } } as const;
  },
  addDialog: (item: IDialog) => {
    return { type: ActionTypes.ADD_DIALOG, payload: { item } } as const;
  },
  showAll: () => {
    return { type: ActionTypes.FILTER, payload: { type: FilterTypes.SHOW_ALL, key: "" } } as const;
  },
  showByFullName: (key: string) => {
    return { type: ActionTypes.FILTER, payload: { type: FilterTypes.SHOW_BY_FULLNAME, key } } as const;
  },
};

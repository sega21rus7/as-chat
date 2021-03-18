import { jsonFetch } from "tools";
import { ThunkType } from "./types";
import actionCreators from "./actionCreators";
import { message } from "antd";
import { IDialog } from "tools/interfaces";

export const fetchDialogs = (): ThunkType => {
  return async dispatch => {
    try {
      dispatch(actionCreators.startFetchDialogs());
      const { dialogs } = await jsonFetch<IDialog[]>("/api/chat/dialogs", undefined, { method: "GET" });
      dispatch(actionCreators.successFetchDialogs(dialogs));
    } catch (err) {
      dispatch(actionCreators.failFetchDialogs(err.message || err));
    }
  };
};

export const postDialog = (companion: string, messageText: string): ThunkType => {
  return async dispatch => {
    try {
      dispatch(actionCreators.startPostDialog());
      await jsonFetch<IDialog>("/api/chat/dialogs", {
        companion,
        messageText,
      });
    } catch (err) {
      message.error(err.message || err);
      dispatch(actionCreators.failPostDialog(err.message || err));
    }
  };
};

export const postDeleteDialog = (dialogID: string): ThunkType => {
  return async dispatch => {
    try {
      dispatch(actionCreators.startPostDeleteDialog());
      await jsonFetch<IDialog>(`/api/chat/dialogs/${dialogID}`, undefined, {
        method: "DELETE",
      });
      // dispatch(actionCreators.removeDialog(dialog));
    } catch (err) {
      message.error(err.message || err);
      dispatch(actionCreators.failPostDeleteDialog(err.message || err));
    }
  };
};
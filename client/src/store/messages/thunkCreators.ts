import { jsonFetch } from "tools";
import { ThunkType } from "./types";
import actionCreators from "./actionCreators";
import { message } from "antd";
import { IMessage } from "tools/interfaces";

export const fetchMessages = (dialogID: string): ThunkType => {
  return async dispatch => {
    try {
      dispatch(actionCreators.startFetchMessages());
      const { messages } = await jsonFetch<IMessage[]>(
        `/api/chat/messages/${dialogID}`, undefined, { method: "GET" },
      );
      dispatch(actionCreators.successFetchMessages(messages));
    } catch (err) {
      message.error(err.message || err);
      dispatch(actionCreators.failFetchMessages(err.message || err));
    }
  };
};

export const postMessage = (dialogID: string, text: string): ThunkType => {
  return async dispatch => {
    try {
      dispatch(actionCreators.startPostMessage());
      await jsonFetch<IMessage>("/api/chat/messages", {
        dialog: dialogID,
        text,
      });
    } catch (err) {
      message.error(err.message || err);
      dispatch(actionCreators.failPostMessage(err.message || err));
    }
  };
};

export const postDeleteMessage = (messageID: string): ThunkType => {
  return async dispatch => {
    try {
      dispatch(actionCreators.startPostDeleteMessage());
      await jsonFetch<IMessage>(`/api/chat/messages/${messageID}`, undefined, {
        method: "DELETE",
      });
    } catch (err) {
      message.error(err.message || err);
      dispatch(actionCreators.failPostDeleteMessage(err.message || err));
    }
  };
};
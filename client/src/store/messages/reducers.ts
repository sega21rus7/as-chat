/* eslint-disable indent */
import { IMessage } from "tools/interfaces";
import { Nullable } from "tools/types";
import { ActionTypes } from "./actionTypes";
import { ActionCreatorTypes } from "./types";

const initialState = {
  items: null as Nullable<IMessage[]>,
  fetchMessagesError: "",
  fetchMessagesLoading: false,
  postMessageError: "",
  postDeleteMessageError: "",
};

type StateType = typeof initialState;

const messagesReducer = (state = initialState, action: ActionCreatorTypes): StateType => {
  switch (action.type) {
    case ActionTypes.FETCH_MESSAGES_START:
      return { ...state, fetchMessagesLoading: true };
    case ActionTypes.FETCH_MESSAGES_FAIL:
      return { ...state, fetchMessagesError: action.payload.error, fetchMessagesLoading: false };
    case ActionTypes.FETCH_MESSAGES_SUCCESS:
      return { ...state, items: action.payload.items, fetchMessagesLoading: false };
    case ActionTypes.ADD_MESSAGE:
      return {
        ...state,
        items: [
          ...(state.items ? state.items : []),
          action.payload.item,
        ],
      };
    case ActionTypes.POST_MESSAGE_FAIL:
      return { ...state, postMessageError: action.payload.error };
    case ActionTypes.RESET_MESSAGES:
      return initialState;
    case ActionTypes.POST_DELETE_MESSAGE_FAIL:
      return { ...state, postDeleteMessageError: action.payload.error };
    case ActionTypes.REMOVE_MESSAGE:
      return {
        ...state,
        items: state.items && state.items.filter(x => x._id !== action.payload.item._id),
      };
    default:
      return state;
  }
};

export default messagesReducer;
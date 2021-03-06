/* eslint-disable indent */
import { IMessage } from "tools/interfaces";
import { Nullable } from "tools/types";
import { CommonActionType, ActionTypes } from "./interfaces";

const initialState = {
  items: null as Nullable<IMessage[]>,
  fetchMessagesError: "",
  postMessageError: "",
};

type StateType = typeof initialState;

const messagesReducer = (state = initialState, action: CommonActionType): StateType => {
  switch (action.type) {
    case ActionTypes.FETCH_MESSAGES_FAIL:
      return { ...state, fetchMessagesError: action.payload.error };
    case ActionTypes.FETCH_MESSAGES_SUCCESS:
      return { ...state, items: action.payload.items };
    case ActionTypes.ADD_MESSAGE:
      if (!state.items) { return state; }
      return { ...state, items: [...state.items, action.payload.item] };
    case ActionTypes.POST_MESSAGE_FAIL:
      return { ...state, postMessageError: action.payload.error };
    case ActionTypes.RESET_MESSAGES:
      return initialState;
    default:
      return state;
  }
};

export default messagesReducer;
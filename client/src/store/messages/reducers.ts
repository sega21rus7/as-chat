/* eslint-disable indent */
import { StateType, CommonActionType, ActionTypes } from "./interfaces";

const initialState: StateType = {
  items: [],
  fetchMessagesError: "",
  postMessageError: "",
};

const messagesReducer = (state = initialState, action: CommonActionType): StateType => {
  switch (action.type) {
    case ActionTypes.FETCH_MESSAGES_FAIL:
      return { ...state, fetchMessagesError: action.payload.error };
    case ActionTypes.FETCH_MESSAGES_SUCCESS:
      return { ...state, items: action.payload.items };
    case ActionTypes.ADD_MESSAGE:
      return { ...state, items: [...state.items, action.payload.item] };
    case ActionTypes.POST_MESSAGE_FAIL:
      return { ...state, postMessageError: action.payload.error };
    default:
      return state;
  }
};

export default messagesReducer;
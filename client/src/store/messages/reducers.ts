/* eslint-disable indent */
import { StateType, CommonActionType, ActionTypes } from "./interfaces";

const initialState: StateType = {
  items: [],
  error: "",
};

const messagesReducer = (state = initialState, action: CommonActionType): StateType => {
  switch (action.type) {
    case ActionTypes.FETCH_Messages_FAIL:
      return { ...state, error: action.payload.error };
    case ActionTypes.FETCH_Messages_SUCCESS:
      return { ...state, items: action.payload.items };
    default:
      return state;
  }
};

export default messagesReducer;
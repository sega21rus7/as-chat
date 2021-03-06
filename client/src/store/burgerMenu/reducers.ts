/* eslint-disable indent */
import { CommonActionType, ActionTypes } from "./interfaces";

const initialState = {
  active: false,
};

type StateType = typeof initialState;

const burgerMenuReducer = (state = initialState, action: CommonActionType): StateType => {
  switch (action.type) {
    case ActionTypes.OPEN:
      return { active: true };
    case ActionTypes.CLOSE:
      return { active: false };
    default:
      return state;
  }
};

export default burgerMenuReducer;
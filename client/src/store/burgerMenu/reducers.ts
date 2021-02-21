/* eslint-disable indent */
import { StateType, CommonActionType, ActionTypes } from "./interfaces";

const initialState: StateType = {
  active: false,
};

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
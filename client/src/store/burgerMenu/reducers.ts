/* eslint-disable indent */
import { ActionTypes } from "./actionTypes";
import { ActionCreatorTypes } from "./types";

const initialState = {
  active: false,
};

type StateType = typeof initialState;

const burgerMenuReducer = (state = initialState, action: ActionCreatorTypes): StateType => {
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
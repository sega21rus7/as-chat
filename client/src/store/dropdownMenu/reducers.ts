/* eslint-disable indent */
import { StateType, CommonActionType, ActionTypes } from "./interfaces";

const initialState: StateType = {
  active: false,
};

const dropdownMenuReducer = (state = initialState, action: CommonActionType): StateType => {
  switch (action.type) {
    case ActionTypes.OPEN_DROPDOWN_MENU:
      return { active: true };
    case ActionTypes.CLOSE_DROPDOWN_MENU:
      return { active: false };
    default:
      return state;
  }
};

export default dropdownMenuReducer;
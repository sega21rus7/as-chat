import {
  ActionTypes,
  OpenDropdownMenuActionType,
  CloseDropdownMenuActionType,
} from "./interfaces";

export const openDropdownMenu = (): OpenDropdownMenuActionType => {
  return { type: ActionTypes.OPEN_DROPDOWN_MENU };
};

export const closeDropdownMenu = (): CloseDropdownMenuActionType => {
  return { type: ActionTypes.CLOSE_DROPDOWN_MENU };
};
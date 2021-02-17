export enum ActionTypes {
  OPEN_DROPDOWN_MENU = "DROPDOWN_MENU/OPEN",
  CLOSE_DROPDOWN_MENU = "DROPDOWN_MENU/CLOSE",
}

export interface StateType {
  active: boolean;
}

export interface OpenDropdownMenuActionType {
  type: ActionTypes.OPEN_DROPDOWN_MENU
}

export interface CloseDropdownMenuActionType {
  type: ActionTypes.CLOSE_DROPDOWN_MENU,
}

export type CommonActionType =
  OpenDropdownMenuActionType |
  CloseDropdownMenuActionType;
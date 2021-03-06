export enum ActionTypes {
  OPEN = "BURGER_MENU:OPEN",
  CLOSE = "BURGER_MENU:CLOSE",
}
export interface OpenMenuActionType {
  type: ActionTypes.OPEN
}

export interface CloseMenuActionType {
  type: ActionTypes.CLOSE,
}

export type CommonActionType =
  OpenMenuActionType |
  CloseMenuActionType;
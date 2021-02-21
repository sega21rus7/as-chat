import {
  ActionTypes,
  OpenMenuActionType,
  CloseMenuActionType,
} from "./interfaces";

export const openMenu = (): OpenMenuActionType => {
  return { type: ActionTypes.OPEN };
};

export const closeMenu = (): CloseMenuActionType => {
  return { type: ActionTypes.CLOSE };
};
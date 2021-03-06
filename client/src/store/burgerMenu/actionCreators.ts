/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ActionTypes } from "./actionTypes";

export default {
  openMenu: () => {
    return { type: ActionTypes.OPEN } as const;
  },
  closeMenu: () => {
    return { type: ActionTypes.CLOSE } as const;
  },
};

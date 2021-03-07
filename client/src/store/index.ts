import { Action, combineReducers } from "redux";
import authReducer from "./auth/reducers";
import burgerMenuReducer from "./burgerMenu/reducers";
import dialogsReducer from "./dialogs/reducers";
import messagesReducer from "./messages/reducers";
import createDialogReducer from "./createDialog/reducers";
import { ThunkAction } from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
  burgerMenu: burgerMenuReducer,
  dialogs: dialogsReducer,
  messages: messagesReducer,
  createDialog: createDialogReducer,
});

export type rootStateType = ReturnType<typeof rootReducer>

type InferActionTypes<T> = T extends { [key: string]: infer U } ? U : never;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InferActionCreatorTypes<T extends { [key: string]: (...args: any[]) => any }> =
  ReturnType<InferActionTypes<T>>
export type BaseThunkType<A extends Action, R =
  Promise<void>> = ThunkAction<R, rootStateType, unknown, A>

export default rootReducer;
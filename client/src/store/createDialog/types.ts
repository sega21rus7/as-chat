import { BaseThunkType, InferActionCreatorTypes } from "store";
import actionCreators from "./actionCreators";

export type ActionCreatorTypes = InferActionCreatorTypes<typeof actionCreators>;
export type ThunkType = BaseThunkType<ActionCreatorTypes>;
export enum FilterTypes {
  SHOW_ALL = "SHOW_ALL",
  SHOW_BY_FULLNAME = "SHOW_BY_FULLNAME",
}
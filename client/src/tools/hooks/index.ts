import { TypedUseSelectorHook } from "react-redux";
import { useSelector as defaultUseSelector } from "react-redux";
import { rootStateType } from "store";

export const useSelector: TypedUseSelectorHook<rootStateType> = defaultUseSelector;
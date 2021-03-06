import { InferActionCreatorTypes } from "store";
import actionCreators from "./actionCreators";

export type ActionCreatorTypes = InferActionCreatorTypes<typeof actionCreators>;
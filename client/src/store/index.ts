import { combineReducers } from "redux";
import authReducer from "./auth/reducers";
import burgerMenuReducer from "./burgerMenu/reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  burgerMenu: burgerMenuReducer,
});

export default rootReducer;
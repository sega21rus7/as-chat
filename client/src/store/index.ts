import { combineReducers } from "redux";
import authReducer from "./auth/reducers";
import burgerMenuReducer from "./burgerMenu/reducers";
import dialogsReducer from "./dialogs/reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  burgerMenu: burgerMenuReducer,
  dialogs: dialogsReducer,
});

export default rootReducer;
import { combineReducers } from "redux";
import authReducer from "./auth/reducers";
import burgerMenuReducer from "./burgerMenu/reducers";
import dialogsReducer from "./dialogs/reducers";
import messagesReducer from "./messages/reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  burgerMenu: burgerMenuReducer,
  dialogs: dialogsReducer,
  messages: messagesReducer,
});

export default rootReducer;
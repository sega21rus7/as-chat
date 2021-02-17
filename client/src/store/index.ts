import { combineReducers } from "redux";
import authReducer from "./auth/reducers";
import dropdownMenuReducer from "./dropdownMenu/reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  dropdownMenu: dropdownMenuReducer,
});

export default rootReducer;
import { combineReducers } from "redux";
import accountReducer from "modules/accountReducer";

const rootReducer = combineReducers({
  accountReducer,
});

export default rootReducer;

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import accountReducer from "modules/accountReducer";

const rootReducer = combineReducers({
  accountReducer,
});

const persistConfig = {
  key: "root",
  storage: storage,
};

export default persistReducer(persistConfig, rootReducer);

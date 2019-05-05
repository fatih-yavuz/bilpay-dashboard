import { combineReducers, createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import { systemReducer } from "./system/reducers";
import { userReducer } from "./user/reducers";

const rootReducer = combineReducers({
  system: systemReducer,
  selectedUser: userReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  return createStore(rootReducer, devToolsEnhancer({}));
}

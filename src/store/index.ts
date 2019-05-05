import { systemReducer } from "./system/reducers";
import { combineReducers, createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";

const rootReducer = combineReducers({
  system: systemReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  return createStore(rootReducer, devToolsEnhancer({}));
}

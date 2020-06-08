import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as toastrReducer } from "react-redux-toastr";
import mainReducer from "./reducer";
import thunk from "redux-thunk";

export default function configureStore(initialState = {}) {
  const rootReducer = combineReducers({ mainReducer, toastrReducer });
  const composedEnhancers = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, initialState, composedEnhancers);
}

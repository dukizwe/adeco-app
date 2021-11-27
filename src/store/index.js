import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import { affectationsReducer } from "./reducers/affectationsReducer";
import { craReducer } from "./reducers/craReducer";
import userReducer from "./reducers/userReducer";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))

export const store = createStore(
          combineReducers({
                    user: userReducer,
                    affectations: affectationsReducer,
                    cras: craReducer
          }),
          composedEnhancer
)
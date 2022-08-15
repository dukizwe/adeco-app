import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, co } from "redux";
// import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import { affectationsReducer } from "./reducers/affectationsReducer";
import userReducer from "./reducers/userReducer";

// const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))

export const store = configureStore({
          reducer: {
                    user: userReducer,
                    affectations: affectationsReducer
          }
})
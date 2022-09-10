import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
// import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import contributionReducer from "./reducers/contributionReducer";
import userReducer from "./reducers/userReducer";

// const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))

export const store = configureStore({
          reducer: {
                    user: userReducer,
                    contribution: contributionReducer
          }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
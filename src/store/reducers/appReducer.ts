import { AppReducerIntreface } from "../../interfaces/AppReducerInterface"
import { ContributionContextInterface } from "../../types/ContributionContextInterface"
import { QueuedUser } from "../../types/QueuedUser"

export enum APP_TYPES {
          SET_LOADING = "SET_LOADING",
          SET_PUSH_TOKEN = "SET_PUSH_TOKEN"
}

export interface AppAction {
          type?: APP_TYPES,
          payload?: any
}

const initial: AppReducerIntreface = {
          isLoading: false,
          pushToken: null
}

export default function appReducer(contributionState: AppReducerIntreface = initial, action: AppAction) {
          switch (action.type) {
                    case APP_TYPES.SET_LOADING:
                              return {...contributionState, isLoading: action.payload}
                    case APP_TYPES.SET_PUSH_TOKEN:
                              return {...contributionState, pushToken: action.payload}
                    default:
                              return contributionState
          }
}
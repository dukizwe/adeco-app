import { ContributionContextInterface } from "../../types/ContributionContextInterface"
import { User } from "../../types/User"

export enum CONTRIBUTION_TYPES {
          SET_IN_SELECT = "SET_IN_SELECT",
          TOGGLE_IN_SELECT = "TOGGLE_IN_SELECT",
          SET_SELECTED_BATCH = "SET_SELECTED_BATCH",
          SET_QUEUE_LIST = "SET_QUEUE_LIST",
          SET_START_ANIMATION = "SET_START_ANIMATION",
          TOGGLE_START_ANIMATION = "TOGGLE_START_ANIMATION",
          SET_PREVIOUS_TOTAL = "SET_PREVIOUS_TOTAL",
          APPEND_ACTIVITY = "APPEND_ACTIVITY"
}

export interface ContributionAction {
          type?: CONTRIBUTION_TYPES,
          payload?: any
}

const initial: ContributionContextInterface = {
          inSelect: false,
          selectedBatch: [],
          queueList: {
                    contributions: [],
                    activities: []
          },
          startAnimation: false
}

export default function contributionReducer(contributionState: ContributionContextInterface = initial, action: ContributionAction) {
          switch (action.type) {
                    case CONTRIBUTION_TYPES.SET_IN_SELECT:
                              return {...contributionState, inSelect: action.payload}
                    case CONTRIBUTION_TYPES.TOGGLE_IN_SELECT:
                              return {...contributionState, inSelect: !contributionState.inSelect}
                    case CONTRIBUTION_TYPES.SET_SELECTED_BATCH:
                              return {...contributionState, selectedBatch: action.payload}
                    case CONTRIBUTION_TYPES.SET_QUEUE_LIST:
                              return {...contributionState, queueList: action.payload}
                    case CONTRIBUTION_TYPES.SET_START_ANIMATION:
                              return {...contributionState, startAnimation: action.payload}
                    case CONTRIBUTION_TYPES.TOGGLE_START_ANIMATION:
                              return {...contributionState, startAnimation: !contributionState.startAnimation}
                    case CONTRIBUTION_TYPES.APPEND_ACTIVITY:
                              const existsActivities = contributionState.queueList.activities
                              return {...contributionState, queueList: {...contributionState.queueList, activities: existsActivities ? [...existsActivities, action.payload ] : [action.payload]}}
                    default:
                              return contributionState
          }
}
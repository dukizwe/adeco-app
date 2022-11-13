import { ContributionContextInterface } from "../../types/ContributionContextInterface"
import { QueuedUser } from "../../types/QueuedUser"

export enum CONTRIBUTION_TYPES {
          SET_IN_SELECT = "SET_IN_SELECT",
          TOGGLE_IN_SELECT = "TOGGLE_IN_SELECT",
          SET_SELECTED_BATCH = "SET_SELECTED_BATCH",
          SET_QUEUE_LIST = "SET_QUEUE_LIST",
          SET_START_ANIMATION = "SET_START_ANIMATION",
          TOGGLE_START_ANIMATION = "TOGGLE_START_ANIMATION",
          SET_PREVIOUS_TOTAL = "SET_PREVIOUS_TOTAL",
          SET_ACTIVITIES = "SET_ACTIVITIES",
          APPEND_ACTIVITY = "APPEND_ACTIVITY",
          SET_CONTRIBUTORS = "SET_CONTRIBUTORS",
          SET_RATE_TYPES = "SET_RATE_TYPES",
          RESET_NEW_CONTRIBUTION = "RESET_NEW_CONTRIBUTION"
}

export interface ContributionAction {
          type?: CONTRIBUTION_TYPES,
          payload?: any
}

const initial: ContributionContextInterface = {
          inSelect: false,
          selectedBatch: [],
          contributors: [],
          rateTypes: [],
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
                    case CONTRIBUTION_TYPES.SET_ACTIVITIES:
                              return {...contributionState, queueList: {...contributionState.queueList, activities: action.payload}}
                    case CONTRIBUTION_TYPES.APPEND_ACTIVITY:
                              const existsActivities = contributionState.queueList.activities
                              return {...contributionState, queueList: {...contributionState.queueList, activities: existsActivities ? [...existsActivities, action.payload ] : [action.payload]}}
                    case CONTRIBUTION_TYPES.SET_CONTRIBUTORS:
                              return {...contributionState, contributors: action.payload}
                    case CONTRIBUTION_TYPES.SET_RATE_TYPES:
                              return {...contributionState, rateTypes: action.payload}
                    case CONTRIBUTION_TYPES.RESET_NEW_CONTRIBUTION:
                              return initial
                    default:
                              return contributionState
          }
}